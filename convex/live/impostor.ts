import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { DatabaseReader, mutation, query } from "../_generated/server";
import { GameState, ImpostorGame, ImpostorGameSchema, ImpostorGameState } from "../types";
import { PatchGameData, ThrowIfWrongGameState } from "../utils";
import { IMPOSTOR_NORMAL, IMPOSTOR_SPICY } from "../data/impostor";

function GetNextImpostorWeighted(
    game: ImpostorGame,
    playerIds: string[],
): string {
    const { previousImpostors } = game.data;

    const WEIGHT_NEVER_IMPOSTOR = 5;
    const WEIGHT_BEEN_IMPOSTOR_LESS_RECENTLY = 3;
    const WEIGHT_RECENT_IMPOSTOR = 1;

    const playerWeights: { [playerId: string]: number } = {};

    playerIds.forEach((playerId) => {
        const hasBeenImpostor = previousImpostors.includes(playerId);

        if (!hasBeenImpostor) {
            playerWeights[playerId] = WEIGHT_NEVER_IMPOSTOR;
        } else {
            const lastImpostor = previousImpostors[previousImpostors.length - 1];
            if (playerId === lastImpostor) {
                playerWeights[playerId] = WEIGHT_RECENT_IMPOSTOR;
            } else {
                playerWeights[playerId] = WEIGHT_BEEN_IMPOSTOR_LESS_RECENTLY;
            }
        }
    });

    const weightedPlayers: string[] = [];
    for (const playerId of playerIds) {
        const weight = playerWeights[playerId];
        for (let i = 0; i < weight; i++) {
            weightedPlayers.push(playerId);
        }
    }

    if (weightedPlayers.length === 0) {
        const randomIndex = Math.floor(Math.random() * playerIds.length);
        return playerIds[randomIndex];
    }

    const randomIndex = Math.floor(Math.random() * weightedPlayers.length);
    return weightedPlayers[randomIndex];
}

function GetNextQuestions(mode:ImpostorGame["data"]["mode"]){
    const questions = mode === "normal" ? IMPOSTOR_NORMAL : IMPOSTOR_SPICY
    const randomIndex = Math.floor(Math.random() * questions.length);

    const normalNormal = Math.random() < 0.5 ? true : false
    
    if(normalNormal){
        return questions[randomIndex]
    }

    return {
        normal: questions[randomIndex].impostor,
        impostor: questions[randomIndex].normal,
    }
}

export async function GetImpostorGame(id: Id<"games">, db: DatabaseReader) {
    const game = await db.get(id);
    if (!game) {
        throw new Error("Game not found");
    }
    const parsedGame = ImpostorGameSchema.safeParse({
        ...game,
        data: JSON.parse(game.data),
    });
    if (!parsedGame.success) {
        console.log(parsedGame.error, game);
        throw new Error("Game data is invalid");
    }
    return parsedGame.data;
}

export const createGame = mutation({
    args: {
        player: v.string(),
        rounds: v.number(),
        mode: v.union(v.literal("normal"),v.literal("spicy")),
    },
    handler: async (ctx, args) => {
        const pin = Math.floor(100000 + Math.random() * 900000).toString();

        const game: Omit<ImpostorGame, "_id"> = {
            pin: pin,
            owner: args.player,
            players: [args.player],
            state: GameState.WAITING_FOR_PLAYERS,
            type: "reactionTime",
            data: {
                rounds: args.rounds,
                mode: args.mode,
                currentRound: 1,
                state: ImpostorGameState.ENTER_ANSWER,
                answers: {},
                impostor: "",
                previousImpostors: [],
                question: GetNextQuestions(args.mode)
            },
        }

        const toInsert = {
            ...game,
            data: JSON.stringify(game.data),
        }

        const id = await ctx.db.insert("games", toInsert);

        return id;
    }
})

export const getGame = query({
    args: {
        id: v.id("games"),
    },
    handler: async (ctx, args) => {
        return GetImpostorGame(args.id, ctx.db);
    }
})

export const onStartGame = mutation({
    args: {
        gameId: v.id("games")
    },
    handler: async (ctx, args) => {
        const game = await GetImpostorGame(args.gameId, ctx.db)
        if (game.state !== GameState.WAITING_FOR_PLAYERS) {
            throw new Error("Game in wrong state")
        }

        const nextImpostor = GetNextImpostorWeighted(game, game.players);
        const newData: ImpostorGame["data"] = {
            ...game.data,
            impostor: nextImpostor,
            previousImpostors: [nextImpostor],
            state: ImpostorGameState.ENTER_ANSWER,
            answers: {},
            currentRound:0,
            question: GetNextQuestions(game.data.mode)       
        }

        await PatchGameData(args.gameId, newData, ctx.db, {
            state: GameState.IN_PROGRESS
        })

    }
})

export const onAnswer = mutation({
    args: {
        gameId: v.id("games"),
        player: v.string(),
        answer: v.string(),
    },
    handler: async (ctx, args) => {
        const game = await GetImpostorGame(args.gameId, ctx.db);
        ThrowIfWrongGameState(game, ImpostorGameState.ENTER_ANSWER);

        const playerAnswers = game.data.answers;
        if (playerAnswers[args.player] !== undefined) {
            throw new Error("Player has already answered this round");
        }

        playerAnswers[args.player] = args.answer;

        if (Object.keys(playerAnswers).length >= game.players.length) {
            const newState: ImpostorGame["data"] = {
                ...game.data,
                answers: playerAnswers,
                state: ImpostorGameState.VIEW_ANSWERS,
            }
            await PatchGameData(args.gameId, newState, ctx.db);

            return;
        } else {
            const newState: ImpostorGame["data"] = {
                ...game.data,
                answers: playerAnswers,
            }
            await PatchGameData(args.gameId, newState, ctx.db);
        }
    }
})

export const onRevealImpostor = mutation({
    args: {
        gameId: v.id("games"),
    },
    handler: async (ctx, args) => {
        const game = await GetImpostorGame(args.gameId, ctx.db);
        ThrowIfWrongGameState(game, ImpostorGameState.VIEW_ANSWERS);

        const newState: ImpostorGame["data"] = {
            ...game.data,
            state: ImpostorGameState.IMPOSTOR_REVEAL,
        }
        await PatchGameData(args.gameId, newState, ctx.db);
    }
})

export const onNextRound = mutation({
    args: {
        gameId: v.id("games"),
    },
    handler: async (ctx, args) => {
        const game = await GetImpostorGame(args.gameId, ctx.db);
        ThrowIfWrongGameState(game, ImpostorGameState.IMPOSTOR_REVEAL);

        const nextRound = game.data.currentRound + 1;
        if (nextRound >= game.data.rounds) {
            const newState: ImpostorGame["data"] = {
                ...game.data,
                state: ImpostorGameState.FINISHED,
            }
            await PatchGameData(args.gameId, newState, ctx.db);
            return;
        } else {
            const nextImpostor = GetNextImpostorWeighted(game, game.players);
            const newState: ImpostorGame["data"] = {
                ...game.data,
                currentRound: nextRound,
                state: ImpostorGameState.ENTER_ANSWER,
                answers:{},
                impostor: nextImpostor,
                previousImpostors: [...game.data.previousImpostors, nextImpostor],
                question: GetNextQuestions(game.data.mode)           
            }
            await PatchGameData(args.gameId, newState, ctx.db);
        }
    }
})


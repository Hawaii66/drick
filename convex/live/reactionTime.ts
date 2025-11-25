import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { DatabaseReader, mutation, query } from "../_generated/server";
import { GameState, ReactionTimeGame, ReactionTimeGameSchema, ReactionTimeGameState } from "../types";
import { PatchGameData, ThrowIfWrongGameState } from "../utils";

function GetRandomDelayMs(minMs: number=1000, maxMs: number=5000): number {
    return Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
}

export async function GetReactionTimeGame(id:Id<"games">, db:DatabaseReader){
    const game = await db.get(id);
    if(!game){
        throw new Error("Game not found");
    }
    const parsedGame = ReactionTimeGameSchema.safeParse({
        ...game,
        data: JSON.parse(game.data),
    });
    if(!parsedGame.success){
        console.log(parsedGame.error,game);
        throw new Error("Game data is invalid");
    }
    return parsedGame.data;
}

export const createGame = mutation({
    args:{
        player:v.string(),
        rounds:v.number()
    },
    handler:async(ctx,args)=>{
        const pin = Math.floor(100000 + Math.random() * 900000).toString();

        const game:Omit<ReactionTimeGame,"_id"> = {
            pin: pin,
            owner: args.player,
            players: [args.player],
            state: GameState.WAITING_FOR_PLAYERS,
            type:"reactionTime",
            data: {
                rounds: args.rounds,
                currentRound: 0,
                scores: {},
                state: ReactionTimeGameState.REACTING,
                delayUntilReactMs: GetRandomDelayMs(),
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
    args:{
        id:v.id("games"),
    },
    handler:async(ctx,args)=>{
        return GetReactionTimeGame(args.id, ctx.db);
    }
})

export const onStartGame = mutation({
    args:{
        gameId:v.id("games")
    },
    handler:async(ctx,args)=>{
        const game = await GetReactionTimeGame(args.gameId, ctx.db)
        if(game.state !== GameState.WAITING_FOR_PLAYERS){
            throw new Error("Game in wrong state")
        }

        await PatchGameData(args.gameId,game.data,ctx.db,{
            state: GameState.IN_PROGRESS
        })

    }
})

export const onReact = mutation({
    args:{
        gameId:v.id("games"),
        player:v.string(),
        reactionTimeMs:v.nullable(v.number())
    },
    handler:async(ctx,args)=>{
        const game = await GetReactionTimeGame(args.gameId, ctx.db);
        ThrowIfWrongGameState(game, ReactionTimeGameState.REACTING);

        const currentRound = game.data.currentRound;
        const playerScores = game.data.scores;
        if(playerScores[args.player] !== undefined){
            throw new Error("Player has already reacted this round");
        }

        playerScores[args.player] = args.reactionTimeMs;

        if(Object.keys(playerScores).length >= game.players.length){
            const newState:ReactionTimeGame["data"] = {
                ...game.data,
                scores: playerScores,
                state: ReactionTimeGameState.RESULTS,
            }
            await PatchGameData(args.gameId, newState, ctx.db);

            return;
        }else{
            const newState:ReactionTimeGame["data"] = {
                ...game.data,
                scores: playerScores,
            }
            await PatchGameData(args.gameId, newState, ctx.db);
        }
    }
})

export const onNextRound = mutation({
    args:{
        gameId:v.id("games"),
    },
    handler:async(ctx,args)=>{
        const game = await GetReactionTimeGame(args.gameId, ctx.db);
        ThrowIfWrongGameState(game, ReactionTimeGameState.RESULTS);

        const nextRound = game.data.currentRound + 1;
        if(nextRound >= game.data.rounds){
            const newState:ReactionTimeGame["data"] = {
                ...game.data,
                state: ReactionTimeGameState.FINISHED,
            }
            await PatchGameData(args.gameId, newState, ctx.db);
            return;
        }else{
            const newState:ReactionTimeGame["data"] = {
                ...game.data,
                currentRound: nextRound,
                scores: {},
                state: ReactionTimeGameState.REACTING,
                delayUntilReactMs: GetRandomDelayMs(),
            }
            await PatchGameData(args.gameId, newState, ctx.db);
        }
    }
})


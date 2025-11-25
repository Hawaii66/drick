import { v } from "convex/values";
import { Id } from "../_generated/dataModel";
import { DatabaseReader, mutation, query } from "../_generated/server";
import { GameState, WhoIsGame, WhoIsGameSchema, WhoIsGameState } from "../types";
import { PatchGameData, ThrowIfWrongGameState } from "../utils";

function AssignPersonsToPlayers(
  playersEnteredPersons: Record<string, string>,
  suggestions: Record<string, string | null>
): Record<string, string> {
  const playerToPerson: Record<string, string> = {};
  const allPlayerIds = Object.keys(playersEnteredPersons);
  const availablePersons = new Set(Object.keys(suggestions));
  const unassignedPlayers = new Set(allPlayerIds);

  const explicitPlayerSuggestions: Record<string, string[]> = {};
  for (const personId of Object.keys(suggestions)) {
    const suggestedPlayerId = suggestions[personId];
    if (suggestedPlayerId) {
      if (!explicitPlayerSuggestions[suggestedPlayerId]) {
        explicitPlayerSuggestions[suggestedPlayerId] = [];
      }
      explicitPlayerSuggestions[suggestedPlayerId].push(personId);
    }
  }

  for (const playerId of allPlayerIds) {
    const personPlayerEntered = playersEnteredPersons[playerId];

    if (
      explicitPlayerSuggestions[playerId] &&
      explicitPlayerSuggestions[playerId].length > 0
    ) {
      const validSuggestions = explicitPlayerSuggestions[playerId].filter(
        (personId) =>
          availablePersons.has(personId) && personId !== personPlayerEntered
      );

      if (validSuggestions.length > 0) {
        const chosenPersonId =
          validSuggestions[Math.floor(Math.random() * validSuggestions.length)];

        playerToPerson[playerId] = chosenPersonId;
        availablePersons.delete(chosenPersonId);
        unassignedPlayers.delete(playerId);
      }
    }
  }

  let remainingPersons = Array.from(availablePersons);
  let playersNeedingPersons = Array.from(unassignedPlayers);

  for (let i = remainingPersons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingPersons[i], remainingPersons[j]] = [
      remainingPersons[j],
      remainingPersons[i],
    ];
  }

  const assignmentsAttempted: Record<string, string> = {}; // Temporarily stores assignments for unassigned players
  const personsAssignedInThisPhase = new Set<string>(); // Keep track of persons assigned in this phase

  for (const playerId of playersNeedingPersons) {
    const personPlayerEntered = playersEnteredPersons[playerId];
    let assigned = false;

    const eligiblePersons = remainingPersons.filter(
      (personId) =>
        personId !== personPlayerEntered && !personsAssignedInThisPhase.has(personId)
    );

    if (eligiblePersons.length > 0) {
      const chosenPersonId =
        eligiblePersons[Math.floor(Math.random() * eligiblePersons.length)];
      assignmentsAttempted[playerId] = chosenPersonId;
      personsAssignedInThisPhase.add(chosenPersonId);
      assigned = true;
    }
  }

  for (const playerId of playersNeedingPersons) {
    if (assignmentsAttempted[playerId]) {
      playerToPerson[playerId] = assignmentsAttempted[playerId];
      unassignedPlayers.delete(playerId);
      availablePersons.delete(assignmentsAttempted[playerId]);
    }
  }

  playersNeedingPersons = Array.from(unassignedPlayers);
  remainingPersons = Array.from(availablePersons); // Update remaining persons after first pass

  for (let i = remainingPersons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingPersons[i], remainingPersons[j]] = [
      remainingPersons[j],
      remainingPersons[i],
    ];
  }

  for (const playerId of playersNeedingPersons) {
    const personPlayerEntered = playersEnteredPersons[playerId];

    let chosenPersonId: string | undefined;
    for (const personId of remainingPersons) {
      if (personId !== personPlayerEntered) {
        chosenPersonId = personId;
        break; 
      }
    }

    if (chosenPersonId) {
      playerToPerson[playerId] = chosenPersonId;
      remainingPersons = remainingPersons.filter((p) => p !== chosenPersonId);
    } else if (
      remainingPersons.includes(personPlayerEntered) &&
      remainingPersons.length === 1
    ) {
      console.warn(
        `Player ${playerId} has no available non-self persons. Assigning self-entered person '${personPlayerEntered}' as fallback.`
      );
      playerToPerson[playerId] = personPlayerEntered;
      remainingPersons = remainingPersons.filter(
        (p) => p !== personPlayerEntered
      );
    } else {
      console.error(
        `Critical error: Player ${playerId} could not be assigned any person, even with self-assignment fallback.`
      );
      if (remainingPersons.length > 0) {
        playerToPerson[playerId] = remainingPersons.shift()!;
      }
    }
  }

  return playerToPerson;
}

export async function GetWhoIsGame(id: Id<"games">, db: DatabaseReader) {
    const game = await db.get(id);
    if (!game) {
        throw new Error("Game not found");
    }
    const parsedGame = WhoIsGameSchema.safeParse({
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
    },
    handler: async (ctx, args) => {
        const pin = Math.floor(100000 + Math.random() * 900000).toString();

        const game: Omit<WhoIsGame, "_id"> = {
            pin: pin,
            owner: args.player,
            players: [args.player],
            state: GameState.WAITING_FOR_PLAYERS,
            type: "whoIs",
            data: {
                state: WhoIsGameState.ENTER_PERSON,
                persons: {},
                hasEnteredPerson: {},
                playerToPerson: {}
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
        return GetWhoIsGame(args.id, ctx.db);
    }
})

export const onStartGame = mutation({
    args: {
        gameId: v.id("games")
    },
    handler: async (ctx, args) => {
        const game = await GetWhoIsGame(args.gameId, ctx.db)
        if (game.state !== GameState.WAITING_FOR_PLAYERS) {
            throw new Error("Game in wrong state")
        }

        await PatchGameData(args.gameId, game.data, ctx.db, {
            state: GameState.IN_PROGRESS
        })

    }
})

export const onEnterPerson = mutation({
    args: {
        gameId: v.id("games"),
        person: v.string(),
        preferedPlayer: v.nullable(v.string()),
        player: v.string()
    },
    handler: async (ctx, args) => {
        const game = await GetWhoIsGame(args.gameId, ctx.db)
        ThrowIfWrongGameState(game, WhoIsGameState.ENTER_PERSON)

        if (game.data.hasEnteredPerson[args.player] !== undefined) {
            throw new Error("Player has already entered a person")
        }

        const persons = game.data.persons
        persons[args.person] = args.preferedPlayer

        const hasEnteredPerson = game.data.hasEnteredPerson
        hasEnteredPerson[args.player] = args.person

        const newData: WhoIsGame["data"] = {
            ...game.data,
            hasEnteredPerson,
            persons
        }

        await PatchGameData(args.gameId, newData, ctx.db)
    }
})

export const onStartGuess = mutation({
    args: {
        gameId: v.id("games")
    },
    handler: async (ctx, args) => {
        const game = await GetWhoIsGame(args.gameId, ctx.db)
        ThrowIfWrongGameState(game, WhoIsGameState.ENTER_PERSON)

        if (game.players.length !== Object.keys(game.data.hasEnteredPerson).length) {
            throw new Error("All players must enter a person first")
        }

        const playerToPerson = AssignPersonsToPlayers(game.data.hasEnteredPerson, game.data.persons)

        const newData: WhoIsGame["data"] = {
            ...game.data,
            playerToPerson,
            state: WhoIsGameState.VIEW_OTHER_PLAYERS
        }

        await PatchGameData(args.gameId, newData, ctx.db)
    }
})

export const onFinish = mutation({
    args: {
        gameId: v.id("games")
    },
    handler: async (ctx, args) => {
        const game = await GetWhoIsGame(args.gameId, ctx.db)
        ThrowIfWrongGameState(game, WhoIsGameState.VIEW_OTHER_PLAYERS)

        const newData: WhoIsGame["data"] = {
            ...game.data,
            state: WhoIsGameState.FINISHED
        }

        await PatchGameData(args.gameId, newData, ctx.db)
    }
})


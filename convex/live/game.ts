import { z } from "zod";
import { Id } from "../_generated/dataModel";
import { DatabaseReader, DatabaseWriter, mutation, query } from "../_generated/server";
import { v } from "convex/values";
import { GameSchema, GameState } from "../types";

export async function GetGame(id: Id<"games">,db:DatabaseReader) {
    const game = await db.get(id);
    if (!game) {
        throw new Error("Game not found");
    }
    const parsedGame = GameSchema.safeParse({
        id: game._id.toString(),
        pin: game.pin,
        players: game.players,
        state: game.state,
    });
    if (!parsedGame.success) {
        throw new Error("Game data is invalid");
    }
    return parsedGame.data;
}

export async function JoinGame(pin:string, player: string,db:DatabaseWriter) {
    const game = await db.query("games").withIndex("by_pin", (q) =>
        q.eq("pin", pin)
    ).first()

    if(!game){
        throw new Error("Game not found");
    }
    if (game.players.includes(player)) {
        throw new Error("Player already in game");
    }
    if (game.state !== GameState.WAITING_FOR_PLAYERS) {
        throw new Error("Game already started");
    }

    await db.patch(game._id, {
        players: [...game.players, player],
    });

    return game;
}


export const joinGame = mutation({
    args:{
        pin:v.string(),
        player:v.string(),
    },
    handler:async(ctx,args)=>{
        const game = await JoinGame(args.pin, args.player, ctx.db);

        return {
            id:game._id,
            type:game.type,
        }
   }
})

export const getGame = query({
    args:{
        id:v.id("games"),
    },
    handler:async(ctx,args)=>{
        return GetGame(args.id, ctx.db);
    }
})

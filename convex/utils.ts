import { Id } from "./_generated/dataModel";
import { DatabaseWriter } from "./_generated/server";
import { Game } from "./types";

export function ThrowIfWrongGameState<T extends { data: { state: string } }>(game: T, state: string) {
    if (game.data.state !== state) {
        throw new Error(`Game not in ${state} state`);
    }
    return true
}

export async function PatchGameData(gameId: Id<"games">, newData: object, db: DatabaseWriter, game?:Partial<Omit<Game,"_id">>) {
    await db.patch(gameId, {
        ...game,
        data: JSON.stringify(newData),
    });
}


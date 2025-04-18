import { Game } from "./game";
import { LiftGame } from "./lift/lift";
import { PromtPartyGame } from "./promptParty/promptParty";
import { STCEvent } from "src/common/event";

export class GameManager {
  games: Game<unknown>[] = [];

  getGame(pin: string) {
    return this.games.find((game) => game.pin === pin);
  }

  createGame(gameType: string) {
    if (gameType === "prompt-party") {
      const game = new PromtPartyGame(this);
      this.games.push(game);
      return game;
    }
    if (gameType === "lift") {
      const game = new LiftGame(this);
      this.games.push(game);
      return game;
    }

    throw new Error("Game type not found: " + gameType);
  }

  closeGame(pin: string) {
    this.games = this.games.filter((i) => i.pin !== pin);
  }

  errorCloseGame(pin: string, message: string) {
    const game = this.games.find((i) => i.pin === pin);
    if (!game) {
      throw new Error("Game not found: " + pin);
    }

    game.sendEventToAllPlayers(STCEvent.COMMON.ERROR, { message });
    this.closeGame(pin);
  }

  hasPlayerInGame(id: string) {
    return this.games.some((game) => game.hasPlayer(id));
  }

  getGameFromPlayer(id: string) {
    return this.games.find((i) => i.hasPlayer(id));
  }
}

import { Game } from "./game";
import { Game1, Game2 } from "./exposed/game1";

export class GameManager {
  games: Game<unknown>[] = [];

  getGame(pin: string) {
    return this.games.find((game) => game.pin === pin);
  }

  createGame(gameType: string) {
    if (gameType === "1") {
      const game = new Game1(this);
      this.games.push(game);
      return game;
    }

    if (gameType === "2") {
      const game = new Game2(this);
      this.games.push(game);
      return game;
    }

    throw new Error("Game type not found: " + gameType);
  }

  closeGame(pin: string) {
    this.games = this.games.filter((i) => i.pin !== pin);
  }

  hasPlayerInGame(id: string) {
    return this.games.some((game) => game.hasPlayer(id));
  }

  getGameFromPlayer(id: string) {
    return this.games.find((i) => i.hasPlayer(id));
  }
}

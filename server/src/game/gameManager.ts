import { Game } from "./game";

export class GameManager {
  games: Game[] = [];

  getGame(pin: string) {
    return this.games.find((game) => game.pin === pin);
  }

  createGame() {
    const game = new Game();
    this.games.push(game);
    return game;
  }

  hasPlayerInGame(id: string) {
    return this.games.some((game) => game.hasPlayer(id));
  }

  getGameFromPlayer(id: string) {
    return this.games.find((i) => i.hasPlayer(id));
  }
}

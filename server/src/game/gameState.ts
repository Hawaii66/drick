import { Event } from "./event";
import { Game } from "./game";
import { Data, Player } from "./player";

export abstract class GameState {
  game: Game;
  state: string;

  constructor(game: Game, state: string) {
    this.game = game;
    this.state = state;
  }

  abstract onPlayerEvent(player: Player, event: Event, data: Data): boolean;
  abstract onServerEvent(event: Event, data: Data): boolean;
}

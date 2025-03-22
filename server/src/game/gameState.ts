import { CTSEvent } from "src/common/event";
import { Game } from "./game";
import { Data, Player } from "./player";

export abstract class GameState<T> {
  game: Game<T>;
  state: string;

  constructor(game: Game<T>, state: string) {
    this.game = game;
    this.state = state;
  }

  abstract onPlayerEvent(
    game: Game<T>,
    player: Player<T>,
    event: CTSEvent,
    data: Data,
  ): boolean;
  abstract onServerEvent(game: Game<T>, event: CTSEvent, data: Data): boolean;
}

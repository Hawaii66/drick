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
    _game: Game<T>,
    _player: Player<T>,
    _event: CTSEvent,
    _data: Data,
  ): boolean;
  abstract onServerEvent(
    _game: Game<T>,
    _event: CTSEvent,
    _data: Data,
  ): boolean;
}

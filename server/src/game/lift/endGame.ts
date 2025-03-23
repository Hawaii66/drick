import { STCEvent } from "src/common/event";
import { GameState } from "../gameState";
import { LiftGame, LiftPlayer } from "./lift";

export class EndGameState extends GameState<LiftPlayer> {
  constructor(game: LiftGame) {
    super(game, "end");

    game.sendEventToAllPlayers(STCEvent.LIFT.ENDED, {});
    game.gameManager.closeGame(game.pin);
  }

  onPlayerEvent(): boolean {
    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

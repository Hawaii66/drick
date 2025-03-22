import { CTSEvent, STCEvent } from "src/common/event";
import { Game } from "../game";
import { GameState } from "../gameState";
import { Player } from "../player";
import { Game1Player } from "./exposed";

export class EndGameState extends GameState<Game1Player> {
  onEndGame(game: Game<Game1Player>, player: Player<Game1Player>) {
    const host = game.getHost();
    if (host.id !== player.id) return false;

    game.sendEventToAllPlayers(STCEvent.EXPOSED.ENDED, {});
    game.gameManager.closeGame(game.pin);
    return true;
  }

  onPlayerEvent(
    game: Game<Game1Player>,
    player: Player<Game1Player>,
    event: CTSEvent,
  ): boolean {
    switch (event) {
      case CTSEvent.EXPOSED.END_GAME: {
        return this.onEndGame(game, player);
      }
    }

    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

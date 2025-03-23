import { CTSEvent, STCEvent } from "src/common/event";
import { Game } from "../game";
import { GameState } from "../gameState";
import { Player } from "../player";
import { PromptPartyGame } from "./promptParty";

export class EndGameState extends GameState<PromptPartyGame> {
  onEndGame(game: Game<PromptPartyGame>, player: Player<PromptPartyGame>) {
    const host = game.getHost();
    if (host.id !== player.id) return false;

    game.sendEventToAllPlayers(STCEvent.PROMPT_PARTY.ENDED, {});
    game.gameManager.closeGame(game.pin);
    return true;
  }

  onPlayerEvent(
    game: Game<PromptPartyGame>,
    player: Player<PromptPartyGame>,
    event: CTSEvent,
  ): boolean {
    switch (event) {
      case CTSEvent.PROMPT_PARTY.END_GAME: {
        return this.onEndGame(game, player);
      }
    }

    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

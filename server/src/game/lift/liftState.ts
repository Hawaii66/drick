import { CTSEvent, STCEvent } from "src/common/event";
import { GameState } from "../gameState";
import { LiftGame, LiftPlayer } from "./lift";
import { Data, Player } from "../player";
import { z } from "zod";
import { LiftTimerState } from "./timerState";
import { EndGameState } from "./endGame";

export class LiftState extends GameState<LiftPlayer> {
  lifted: Map<string, number> = new Map();

  constructor(game: LiftGame) {
    super(game, "lift");

    game.sendEventToAllPlayers(STCEvent.LIFT.END_ROUND, {});
  }

  onAllLifted(game: LiftGame) {
    const response: { id: string; time: number }[] = [];
    Array.from(this.lifted).forEach(([id, time]) => {
      const player = game.getPlayer(id);
      if (player) {
        player.metadata.score += time;
        response.push({ id, time });
      }
    });

    Array.from(game.failedPlayers).forEach((id) => {
      const player = game.getPlayer(id);
      if (player) {
        player.metadata.score += 1000;
        response.push({ id, time: 1000 });
      }
    });

    this.game.sendEventToAllPlayers(STCEvent.LIFT.COMPLETED, {
      result: response,
      scores: game.players.map((player) => ({
        id: player.id,
        score: player.metadata.score,
      })),
    });

    game.rounds -= 1;
    if (game.rounds === 0) {
      this.game.state = new EndGameState(game);
      return;
    }

    this.game.state = new LiftTimerState(game);
  }

  onFingerUp(game: LiftGame, player: Player<LiftPlayer>, time: number) {
    if (this.lifted.has(player.id)) {
      return false;
    }

    this.lifted.set(player.id, time);
    if (this.lifted.size + game.failedPlayers.size === game.players.length) {
      this.onAllLifted(game);
    }

    return true;
  }

  onPlayerEvent(
    game: LiftGame,
    player: Player<LiftPlayer>,
    event: CTSEvent,
    data: Data,
  ): boolean {
    switch (event) {
      case CTSEvent.LIFT.FINGER_UP: {
        const { time } = z
          .object({
            time: z.number(),
          })
          .parse(data);
        return this.onFingerUp(game, player, time);
      }
    }

    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

import { CTSEvent, STCEvent } from "src/common/event";
import { GameState } from "../gameState";
import { LiftGame, LiftPlayer } from "./lift";
import { Player } from "../player";
import { LiftState } from "./liftState";

function getDelayMs(): number {
  return 500;
  const rand = Math.random(); // 0 to 1

  if (rand < 0.7) {
    // 70% chance: 5–10 seconds
    return 5000 + Math.random() * 5000;
  } else if (rand < 0.95) {
    // 25% chance: 10–15 seconds
    return 10000 + Math.random() * 5000;
  } else {
    // 5% chance: 15–20 seconds
    return 15000 + Math.random() * 5000;
  }
}

export class LiftTimerState extends GameState<LiftPlayer> {
  fingersDown: Set<string> = new Set();
  roundStarted: boolean = false;

  constructor(game: LiftGame) {
    super(game, "timer");
    game.failedPlayers = new Set();
  }

  onRoundStart(game: LiftGame) {
    this.roundStarted = true;

    const delay = getDelayMs();

    this.game.sendEventToAllPlayers(STCEvent.LIFT.START_ROUND, {});
    setTimeout(() => {
      this.game.state = new LiftState(game);
    }, delay);
  }

  onFingerDown(game: LiftGame, player: Player<LiftPlayer>) {
    if (this.fingersDown.has(player.id)) {
      throw new Error("Finger is already down");
    }

    this.fingersDown.add(player.id);
    game.sendEventToAllPlayers(STCEvent.LIFT.FINGER_STATUS, {
      ids: Array.from(this.fingersDown),
    });

    if (this.fingersDown.size === this.game.players.length) {
      this.onRoundStart(game);
    }
  }

  onFingerUp(game: LiftGame, player: Player<LiftPlayer>) {
    if (this.roundStarted) {
      game.failedPlayers.add(player.id);
      game.sendEventToPlayer(player.id, STCEvent.LIFT.TO_EARLY, {});
      return;
    }

    if (!this.fingersDown.has(player.id)) {
      throw new Error("Finger is already up");
    }

    this.fingersDown.delete(player.id);
    game.sendEventToAllPlayers(STCEvent.LIFT.FINGER_STATUS, {
      ids: Array.from(this.fingersDown),
    });
  }

  onPlayerEvent(
    game: LiftGame,
    player: Player<LiftPlayer>,
    event: CTSEvent,
  ): boolean {
    switch (event) {
      case CTSEvent.LIFT.FINGER_DOWN: {
        this.onFingerDown(game, player);
        return true;
      }
      case CTSEvent.LIFT.FINGER_UP: {
        this.onFingerUp(game, player);
        return true;
      }
    }

    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

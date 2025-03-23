import { z } from "zod";
import { GameState } from "../gameState";
import { Data, Player } from "../player";
import { CTSEvent, STCEvent } from "src/common/event";
import { LiftGame, LiftPlayer } from "./lift";
import { LiftTimerState } from "./timerState";

export class JoinLiftGameState extends GameState<LiftPlayer> {
  constructor(game: LiftGame) {
    super(game, "join");
  }

  onHostGame(game: LiftGame, _: CTSEvent, data: Data): boolean {
    if (game.players.length > 0) {
      return false;
    }

    const {
      socket,
      data: { name, rounds },
    } = z
      .object({
        socket: z.any(),
        data: z.object({
          name: z.string().min(3),
          rounds: z.number().min(2),
        }),
      })
      .parse(data);

    game.setHost(socket.id);

    game.addPlayer({
      socket,
      name: name,
      id: socket.id,
      metadata: {
        score: 0,
      },
    });
    game.rounds = rounds;

    return true;
  }

  onJoinGame(game: LiftGame, _: CTSEvent, data: Data): boolean {
    if (game.players.length === 0) {
      return false;
    }

    const { socket, name } = z
      .object({
        socket: z.any(),
        name: z.string().min(3),
      })
      .parse(data);

    game.addPlayer({
      socket: socket,
      id: socket.id,
      name: name,
      metadata: {
        score: 0,
      },
    });
    return true;
  }

  onStartGame(game: LiftGame): boolean {
    if (game.players.length < 3) {
      return false;
    }

    game.sendEventToAllPlayers(STCEvent.COMMON.START_GAME, { pin: game.pin });

    game.changeState(new LiftTimerState(game));
    return true;
  }

  onServerEvent(game: LiftGame, event: CTSEvent, data: Data): boolean {
    switch (event) {
      case CTSEvent.COMMON.HOST_GAME:
        return this.onHostGame(game, event, data);
      case CTSEvent.COMMON.JOIN_GAME:
        return this.onJoinGame(game, event, data);
    }

    return false;
  }

  onPlayerEvent(game: LiftGame, _: Player<LiftPlayer>, event: CTSEvent) {
    switch (event) {
      case CTSEvent.COMMON.START_GAME:
        return this.onStartGame(game);
    }
    return false;
  }
}

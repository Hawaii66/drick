import { z } from "zod";
import { GameState } from "../gameState";
import { Data, Player } from "../player";
import { Game1, Game1Player } from "./game1";
import { AnswerQuestionState } from "./answerQuestions";
import { CTSEvent } from "../event";

export class JoinGameState extends GameState<Game1Player> {
  constructor(game: Game1) {
    super(game, "join");
  }

  onHostGame(game: Game1, _: CTSEvent, data: Data): boolean {
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
          rounds: z.number().min(5),
        }),
      })
      .parse(data);

    game.setHost(socket.id);

    game.addPlayer({
      socket,
      name: name,
      id: socket.id,
      metadata: {
        questions: [],
      },
    });
    game.rounds = rounds;

    return true;
  }

  onJoinGame(game: Game1, _: CTSEvent, data: Data): boolean {
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
        questions: [],
      },
    });
    return true;
  }

  onStartGame(game: Game1, _: CTSEvent, data: Data): boolean {
    if (game.players.length < 3) {
      return false;
    }

    game.changeState(new AnswerQuestionState(game));
    return true;
  }

  onServerEvent(game: Game1, event: CTSEvent, data: Data): boolean {
    switch (event) {
      case CTSEvent.COMMON.HOST_GAME:
        return this.onHostGame(game, event, data);
      case CTSEvent.COMMON.JOIN_GAME:
        return this.onJoinGame(game, event, data);
    }

    return false;
  }

  onPlayerEvent(
    game: Game1,
    player: Player<Game1Player>,
    event: CTSEvent,
    data: Data
  ) {
    switch (event) {
      case CTSEvent.COMMON.START_GAME:
        return this.onStartGame(game, event, data);
    }
    return false;
  }
}

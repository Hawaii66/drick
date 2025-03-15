import { z } from "zod";
import { Game } from "../game";
import { GameState } from "../gameState";
import { Data, Player } from "../player";
import { Event } from "../event";
import { Game1, Game1Player } from "./game1";
import { AnswerQuestionState } from "./answerQuestions";

export class JoinGameState extends GameState<Game1Player> {
  constructor(game: Game1) {
    super(game, "join");
  }

  onHostGame(game: Game1, _: Event, data: Data): boolean {
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

    game.addPlayer({
      socket,
      name: name,
      id: socket.id,
      metadata: {
        questions: [],
      },
    });
    game.rounds = rounds;

    game.setHost(socket.id);
    return true;
  }

  onJoinGame(game: Game1, _: Event, data: Data): boolean {
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

  onStartGame(game: Game1, _: Event, data: Data): boolean {
    if (game.players.length < 3) {
      return false;
    }

    game.changeState(new AnswerQuestionState(game));
    return true;
  }

  onServerEvent(game: Game1, event: Event, data: Data): boolean {
    switch (event) {
      case Event.HOST_GAME:
        return this.onHostGame(game, event, data);
      case Event.JOIN_GAME:
        return this.onJoinGame(game, event, data);
    }

    return false;
  }

  onPlayerEvent(
    game: Game1,
    player: Player<Game1Player>,
    event: Event,
    data: Data
  ) {
    switch (event) {
      case Event.START_GAME:
        return this.onStartGame(game, event, data);
    }
    return false;
  }
}

import { z } from "zod";
import { GameState } from "../gameState";
import { Data, Player } from "../player";
import { PromtPartyGame, PromptPartyGame } from "./promptParty";
import { AnswerQuestionState } from "./answerQuestions";
import { CTSEvent, STCEvent } from "src/common/event";

export class JoinGameState extends GameState<PromptPartyGame> {
  constructor(game: PromtPartyGame) {
    super(game, "join");
  }

  onHostGame(game: PromtPartyGame, _: CTSEvent, data: Data): boolean {
    if (game.players.length > 0) {
      return false;
    }

    const {
      socket,
      data: { name, questionsPerPlayer },
    } = z
      .object({
        socket: z.any(),
        data: z.object({
          name: z.string().min(3),
          questionsPerPlayer: z.number().min(2),
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
    game.questionsPerPlayer = questionsPerPlayer;

    return true;
  }

  onJoinGame(game: PromtPartyGame, _: CTSEvent, data: Data): boolean {
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

  onStartGame(game: PromtPartyGame): boolean {
    if (game.players.length < 3) {
      return false;
    }

    game.sendEventToAllPlayers(STCEvent.COMMON.START_GAME, { pin: game.pin });

    game.changeState(new AnswerQuestionState(game));
    return true;
  }

  onServerEvent(game: PromtPartyGame, event: CTSEvent, data: Data): boolean {
    switch (event) {
      case CTSEvent.COMMON.HOST_GAME:
        return this.onHostGame(game, event, data);
      case CTSEvent.COMMON.JOIN_GAME:
        return this.onJoinGame(game, event, data);
    }

    return false;
  }

  onPlayerEvent(
    game: PromtPartyGame,
    _: Player<PromptPartyGame>,
    event: CTSEvent,
  ) {
    switch (event) {
      case CTSEvent.COMMON.START_GAME:
        return this.onStartGame(game);
    }
    return false;
  }
}

import { z } from "zod";
import { GameState } from "../gameState";
import { Player, Data } from "../player";
import { Game1, Game1Player } from "./game1";
import { NeedsAnswers, SmallGame } from "./questions";
import { EndGameState } from "./endGame";
import { CTSEvent, STCEvent } from "../event";

export class AnswerQuestionState extends GameState<Game1Player> {
  constructor(game: Game1) {
    super(game, "answer-questions");

    const roundsPerPlayerMax = Math.ceil(game.rounds / game.players.length) + 2;
    const roundsPerPlayer = Math.min(NeedsAnswers.length, roundsPerPlayerMax);

    game.players.forEach((player) => {
      const temp = [...NeedsAnswers].sort(() => Math.random() - 0.5);
      player.metadata.questions = temp.slice(0, roundsPerPlayer);

      game.sendEventToPlayer(player.id, STCEvent.EXPOSED.ANSWER_QUESTIONS, {
        questions: player.metadata.questions,
      });
    });
  }

  onPlayerAnsweredQuestion(
    game: Game1,
    player: Player<Game1Player>,
    _: CTSEvent,
    data: Data
  ): boolean {
    if (game.playersWhoAnswered.includes(player.id)) {
      return false;
    }

    const answers = z
      .object({
        answers: SmallGame.array(),
      })
      .parse(data);

    if (answers.answers.length !== player.metadata.questions.length) {
      return false;
    }

    answers.answers.forEach((a) => game.questions.push(a));

    game.playersWhoAnswered.push(player.id);

    game.playersWhoAnswered.forEach((i) =>
      game.sendEventToPlayer(i, STCEvent.EXPOSED.PLAYER_ANSWERED_QUESTIONS, {
        playersWhoAnswered: game.playersWhoAnswered,
      })
    );

    if (game.players.length === game.playersWhoAnswered.length) {
      game.sendEventToAllPlayers(STCEvent.EXPOSED.SHOW_QUESTION, {
        question: game.questions[game.currentQuestionIndex],
      });
    }

    return true;
  }

  onNextQuestion(
    game: Game1,
    player: Player<Game1Player>,
    _: CTSEvent,
    _1: Data
  ) {
    const host = game.getHost();

    if (host.id !== player.id) {
      return false;
    }

    game.currentQuestionIndex += 1;
    if (game.currentQuestionIndex === game.questions.length) {
      game.sendEventToAllPlayers(STCEvent.EXPOSED.FINISHED, {});
      game.changeState(new EndGameState(game, "end-game"));
      return true;
    }

    game.sendEventToAllPlayers(STCEvent.EXPOSED.SHOW_QUESTION, {
      question: game.questions[game.currentQuestionIndex],
    });

    return true;
  }

  onPlayerEvent(
    game: Game1,
    player: Player<Game1Player>,
    event: CTSEvent,
    data: Data
  ): boolean {
    switch (event) {
      case CTSEvent.EXPOSED.ANSWERED_QUESTIONS: {
        return this.onPlayerAnsweredQuestion(game, player, event, data);
      }
      case CTSEvent.EXPOSED.NEXT_QUESTION: {
        return this.onNextQuestion(game, player, event, data);
      }
    }

    return false;
  }
  onServerEvent(game: Game1, event: CTSEvent, data: Data): boolean {
    return false;
  }
}

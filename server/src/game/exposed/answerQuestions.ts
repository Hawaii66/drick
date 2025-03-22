import { z } from "zod";
import { GameState } from "../gameState";
import { Player, Data } from "../player";
import { Game1, Game1Player } from "./exposed";
import { NeedsAnswers, SmallGame } from "./questions";
import { EndGameState } from "./endGame";
import { STCEvent, CTSEvent } from "src/common/event";

export class AnswerQuestionState extends GameState<Game1Player> {
  constructor(game: Game1) {
    super(game, "answer-questions");

    game.players.forEach((player) => {
      const temp = [...NeedsAnswers].sort(() => Math.random() - 0.5);
      player.metadata.questions = temp.slice(0, game.questionsPerPlayer);

      game.sendEventToPlayer(player.id, STCEvent.EXPOSED.ANSWER_QUESTIONS, {
        questions: player.metadata.questions,
      });
    });
  }

  onPlayerAnsweredQuestion(
    game: Game1,
    player: Player<Game1Player>,
    _: CTSEvent,
    data: Data,
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
      }),
    );

    return true;
  }

  onNextQuestion(game: Game1, player: Player<Game1Player>) {
    const host = game.getHost();

    if (host.id !== player.id) {
      return false;
    }

    game.currentQuestionIndex += 1;
    if (game.currentQuestionIndex === 0) {
      game.questions = game.questions.sort(() => Math.random() - 0.5);
    }

    if (game.currentQuestionIndex === game.questions.length) {
      game.sendEventToAllPlayers(STCEvent.EXPOSED.FINISHED, {});
      game.changeState(new EndGameState(game, "end-game"));
      return true;
    }

    game.sendEventToAllPlayers(STCEvent.EXPOSED.SHOW_QUESTION, {
      question: game.questions[game.currentQuestionIndex],
      currentQuestion: game.currentQuestionIndex + 1,
      totalQuestions: game.questions.length,
    });

    return true;
  }

  onPlayerEvent(
    game: Game1,
    player: Player<Game1Player>,
    event: CTSEvent,
    data: Data,
  ): boolean {
    switch (event) {
      case CTSEvent.EXPOSED.ANSWERED_QUESTIONS: {
        return this.onPlayerAnsweredQuestion(game, player, event, data);
      }
      case CTSEvent.EXPOSED.NEXT_QUESTION: {
        return this.onNextQuestion(game, player);
      }
    }

    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

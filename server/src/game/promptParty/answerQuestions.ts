import { z } from "zod";
import { GameState } from "../gameState";
import { Player, Data } from "../player";
import { PromtPartyGame, PromptPartyGame } from "./promptParty";
import { NeedsAnswers, SmallGame } from "./questions";
import { EndGameState } from "./endGame";
import { STCEvent, CTSEvent } from "src/common/event";

export class AnswerQuestionState extends GameState<PromptPartyGame> {
  constructor(game: PromtPartyGame) {
    super(game, "answer-questions");

    game.players.forEach((player) => {
      const temp = [...NeedsAnswers].sort(() => Math.random() - 0.5);
      player.metadata.questions = temp.slice(0, game.questionsPerPlayer);

      game.sendEventToPlayer(
        player.id,
        STCEvent.PROMPT_PARTY.ANSWER_QUESTIONS,
        {
          questions: player.metadata.questions,
        },
      );
    });
  }

  onPlayerAnsweredQuestion(
    game: PromtPartyGame,
    player: Player<PromptPartyGame>,
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
      game.sendEventToPlayer(
        i,
        STCEvent.PROMPT_PARTY.PLAYER_ANSWERED_QUESTIONS,
        {
          playersWhoAnswered: game.playersWhoAnswered,
        },
      ),
    );

    return true;
  }

  onNextQuestion(game: PromtPartyGame, player: Player<PromptPartyGame>) {
    const host = game.getHost();

    if (host.id !== player.id) {
      return false;
    }

    game.currentQuestionIndex += 1;
    if (game.currentQuestionIndex === 0) {
      game.questions = game.questions.sort(() => Math.random() - 0.5);
    }

    if (game.currentQuestionIndex === game.questions.length) {
      game.sendEventToAllPlayers(STCEvent.PROMPT_PARTY.FINISHED, {});
      game.changeState(new EndGameState(game, "end-game"));
      return true;
    }

    game.sendEventToAllPlayers(STCEvent.PROMPT_PARTY.SHOW_QUESTION, {
      question: game.questions[game.currentQuestionIndex],
      currentQuestion: game.currentQuestionIndex + 1,
      totalQuestions: game.questions.length,
    });

    return true;
  }

  onPlayerEvent(
    game: PromtPartyGame,
    player: Player<PromptPartyGame>,
    event: CTSEvent,
    data: Data,
  ): boolean {
    switch (event) {
      case CTSEvent.PROMPT_PARTY.ANSWERED_QUESTIONS: {
        return this.onPlayerAnsweredQuestion(game, player, event, data);
      }
      case CTSEvent.PROMPT_PARTY.NEXT_QUESTION: {
        return this.onNextQuestion(game, player);
      }
    }

    return false;
  }
  onServerEvent(): boolean {
    return false;
  }
}

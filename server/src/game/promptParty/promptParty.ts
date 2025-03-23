import { Game } from "../game";
import { SmallGame } from "./questions";

export type PromptPartyGame = {
  questions: string[];
};

export class PromtPartyGame extends Game<PromptPartyGame> {
  questionsPerPlayer: number = 0;
  questions: SmallGame[] = [];
  currentQuestionIndex: number = -1;
  playersWhoAnswered: string[] = [];
}

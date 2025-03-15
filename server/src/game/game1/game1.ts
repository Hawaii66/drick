import { Game } from "../game";
import { SmallGame } from "./questions";

export type Game1Player = {
  questions: string[];
};

export class Game1 extends Game<Game1Player> {
  rounds: number = 0;
  questions: SmallGame[] = [];
  currentQuestionIndex: number = 0;
  playersWhoAnswered: string[] = [];
}

export class Game2 extends Game<never> {}

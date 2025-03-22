import { Game } from "../game";
import { SmallGame } from "./questions";

export type Game1Player = {
  questions: string[];
};

export class Game1 extends Game<Game1Player> {
  questionsPerPlayer: number = 0;
  questions: SmallGame[] = [];
  currentQuestionIndex: number = -1;
  playersWhoAnswered: string[] = [];
}

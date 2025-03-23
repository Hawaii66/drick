import { Game } from "../game";

export type LiftPlayer = {
  score: number;
};

export class LiftGame extends Game<LiftPlayer> {
  rounds: number = 0;
  failedPlayers: Set<string> = new Set();
}

import { Socket } from "socket.io";
import { NeedsAnswers } from "./smallGames";

type Player = {
  id: string;
  name: string;
  host: boolean;
  socket: Socket;
  needsAnswers: string[];
};

export class Game {
  players: Player[] = [];
  pin: string;
  rounds: number;
  status: "waiting" | "answering-questions";

  constructor(rounds: number) {
    this.rounds = rounds;
    this.players = [];
    this.pin = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    this.status = "waiting";
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  getHost() {
    const host = this.players.find((player) => player.host);
    if (!host) throw new Error("No host found");
    return host;
  }

  serializePlayers() {
    return this.players.map((player) => ({
      id: player.id,
      name: player.name,
      host: player.host,
      needsAnswers: player.needsAnswers,
    }));
  }

  sendEvent<T>(message: string, data: T) {
    this.players.forEach((player) => {
      player.socket.emit(message, data);
    });
  }

  startAnswerQuestions() {
    this.status = "answering-questions";

    const roundsPerPlayerMax = Math.ceil(this.rounds / this.players.length) + 2;
    const roundsPerPlayer = Math.min(NeedsAnswers.length, roundsPerPlayerMax);

    this.players.forEach((player) => {
      const temp = [...NeedsAnswers].sort(() => Math.random() - 0.5);
      player.needsAnswers = temp.slice(0, roundsPerPlayer);
    });

    this.sendEvent("start-answering-questions", {
      players: this.serializePlayers(),
    });
  }
}

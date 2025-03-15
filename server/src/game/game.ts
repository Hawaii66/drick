import { GameState } from "./gameState";
import { Data, Player } from "./player";

export class Game {
  players: Player[] = [];
  pin: string;
  hostId: string;
  state: GameState | null = null;

  constructor() {
    this.pin = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    this.hostId = "";
  }

  setHost(id: string) {
    this.hostId = id;
  }

  sendEventToPlayer<T>(id: string, event: string, data: T) {
    const player = this.players.find((player) => player.id === id);
    if (player) {
      player.socket.emit(event, data);
      return true;
    }

    return false;
  }

  sendEventToAllPlayers<T>(event: string, data: T) {
    this.players.forEach((player) => player.socket.emit(event, data));
  }

  getPlayer(id: string) {
    return this.players.find((player) => player.id === id);
  }

  hasPlayer(id: string) {
    return this.players.some((player) => player.id === id);
  }

  onPlayerEvent(player: Player, event: string, data: Data) {
    if (!this.state) throw new Error("State not set");

    return this.state.onPlayerEvent(player, event, data);
  }

  onServerEvent(event: string, data: Data) {
    if (!this.state) throw new Error("State not set");

    return this.state.onServerEvent(event, data);
  }

  changeState(state: GameState) {
    this.state = state;
  }
}

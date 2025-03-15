import { CTSEvent, STCEvent } from "./event";
import { GameManager } from "./gameManager";
import { GameState } from "./gameState";
import { Data, Player } from "./player";

export abstract class Game<T> {
  gameManager: GameManager;
  players: Player<T>[] = [];
  pin: string;
  hostId: string;
  state: GameState<T> | null = null;

  constructor(gameManager: GameManager) {
    this.pin = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    this.hostId = "";
    this.gameManager = gameManager;
  }

  setHost(id: string) {
    this.hostId = id;
  }

  getHost() {
    const host = this.getPlayer(this.hostId);

    if (!host) throw new Error("No host found");

    return host;
  }

  sendEventToPlayer<T>(id: string, event: STCEvent, data: T) {
    const player = this.players.find((player) => player.id === id);
    if (player) {
      player.socket.emit(event, data);
      return true;
    }

    return false;
  }

  sendEventToAllPlayers<T>(event: STCEvent, data: T) {
    this.players.forEach((player) => player.socket.emit(event, data));
  }

  sendEventToHost<T>(event: STCEvent, data: T) {
    const host = this.getPlayer(this.hostId);
    if (!host) throw new Error("Host not found");

    this.sendEventToPlayer(host.id, event, data);
  }

  getPlayer(id: string) {
    return this.players.find((player) => player.id === id);
  }

  hasPlayer(id: string) {
    return this.players.some((player) => player.id === id);
  }

  onPlayerEvent(player: Player<T>, event: CTSEvent, data: Data) {
    if (!this.state) throw new Error("State not set");

    return this.state.onPlayerEvent(this, player, event, data);
  }

  onServerEvent(event: CTSEvent, data: Data) {
    if (!this.state) throw new Error("State not set");

    return this.state.onServerEvent(this, event, data);
  }

  changeState(state: GameState<T>) {
    this.state = state;
  }

  addPlayer(player: Player<T>) {
    this.players.push(player);

    this.sendEventToAllPlayers(STCEvent.COMMON.PLAYER_JOINED_GAME, {
      pin: this.pin,
      players: this.players.map((i) => ({
        id: i.id,
        name: i.name,
        isHost: this.hostId === i.id,
      })),
    });
  }
}

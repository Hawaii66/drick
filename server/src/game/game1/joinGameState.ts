import { z } from "zod";
import { Game } from "../game";
import { GameState } from "../gameState";
import { Data, Player } from "../player";
import { Event } from "../event";

export class JoinGameState extends GameState {
  constructor(game: Game) {
    super(game, "join");
  }

  addPlayer(player: Player) {
    this.game.players.push(player);

    player.socket.emit(Event.GAME_PLAYER_JOIN_GAME, {
      pin: this.game.pin,
      players: this.game.players.map((i) => ({ id: i.id, name: i.name })),
    });
  }

  onServerEvent(event: Event, data: Data): boolean {
    if (event === Event.HOST_GAME) {
      if (this.game.players.length > 0) {
        return false;
      }

      const {
        socket,
        data: { name },
      } = z
        .object({
          socket: z.any(),
          data: z.object({
            name: z.string().min(3),
          }),
        })
        .parse(data);

      this.addPlayer({
        socket,
        name: name,
        id: socket.id,
      });

      this.game.setHost(socket.id);
      return true;
    }

    if (event === Event.JOIN_GAME) {
      if (this.game.players.length === 0) {
        return false;
      }

      const { socket, name } = z
        .object({
          socket: z.any(),
          name: z.string().min(3),
        })
        .parse(data);

      this.addPlayer({
        socket: socket,
        id: socket.id,
        name: name,
      });
      return true;
    }

    return false;
  }

  onPlayerEvent(player: Player, event: Event, data: Data) {
    return false;
  }
}

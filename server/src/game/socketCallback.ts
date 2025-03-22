import { BasicSocket, Data } from "./player";
import { GameManager } from "./gameManager";
import { z } from "zod";
import { Game1 } from "./exposed/exposed";
import { JoinGameState } from "./exposed/joinGameState";
import { CTSEvent, STCEvent } from "src/common/event";

export const generateSocketCallback = (gameManager: GameManager) => {
  return (socket: BasicSocket, event: CTSEvent, data: Data) => {
    const game = gameManager.getGameFromPlayer(socket.id);

    let success = false;
    if (game) {
      const player = game.getPlayer(socket.id);
      if (!player) throw new Error("Something went wrong");

      success = game.onPlayerEvent(player, event, data);
    } else {
      if (event === CTSEvent.COMMON.HOST_GAME) {
        const game = gameManager.createGame("1");

        if (game instanceof Game1) {
          game.state = new JoinGameState(game);
        } else {
          throw new Error("Game init state not set");
        }

        success = game.onServerEvent(CTSEvent.COMMON.HOST_GAME, {
          data,
          socket,
        });
      } else if (event === CTSEvent.COMMON.JOIN_GAME) {
        const { pin, name } = z
          .object({
            name: z.string().min(3),
            pin: z.string().length(6),
          })
          .parse(data);

        const game = gameManager.getGame(pin);

        if (game) {
          success = game.onServerEvent(CTSEvent.COMMON.JOIN_GAME, {
            name,
            socket,
          });
        }
      } else {
        success = false;
      }
    }

    if (!success) {
      const game = gameManager.getGameFromPlayer(socket.id);
      if (game) {
        gameManager.errorCloseGame(game.pin, `Wrong event in game: ${event}`);
      } else {
        socket.emit(STCEvent.COMMON.ERROR, {
          message: `Wrong event without game: ${event}`,
        });
      }
    }
  };
};

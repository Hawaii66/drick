import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { z } from "zod";
import cors from "cors";
import { CTSEvent } from "./game/event";
import { Game1 } from "./game/exposed/exposed";
import { JoinGameState } from "./game/exposed/joinGameState";
import { GameManager } from "./game/gameManager";
import { Data } from "./game/player";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (_, res) => res.send("Server is running"));

const gameManager = new GameManager();

const handleSocketCallback = (socket: Socket, event: CTSEvent, data: Data) => {
  console.log("incoming event", socket.id, event);
  const game = gameManager.getGameFromPlayer(socket.id);

  if (game) {
    const player = game.getPlayer(socket.id);
    if (!player) throw new Error("Something went wrong");

    const successfullyHandeled = game.onPlayerEvent(player, event, data);
    if (!successfullyHandeled) {
      throw new Error("Wrong game event: " + event);
    }
  } else {
    if (event === CTSEvent.COMMON.HOST_GAME) {
      const game = gameManager.createGame("1");

      if (game instanceof Game1) {
        game.state = new JoinGameState(game);
      } else {
        throw new Error("Game init state not set");
      }

      game.onServerEvent(CTSEvent.COMMON.HOST_GAME, {
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
        game.onServerEvent(CTSEvent.COMMON.JOIN_GAME, {
          name,
          socket,
        });
      }
    } else {
      throw new Error("Wrong no game event: " + event);
    }
  }
};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.id);
  });

  socket.onAny((event, data) => {
    handleSocketCallback(socket, event, data);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

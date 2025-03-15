import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Game } from "./game";
import { z } from "zod";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (_, res) => res.send("Server is running"));

let games: Game[] = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("debug-games", () => {
    socket.emit("debug-games", games);
  });

  socket.on("host-game", (data) => {
    const { rounds, name } = z
      .object({
        rounds: z.number().int().positive().min(5).max(100),
        name: z.string().min(3).max(20),
      })
      .parse(data);

    const game = new Game(rounds);
    games.push(game);

    game.addPlayer({
      host: true,
      id: socket.id,
      name,
      socket,
      needsAnswers: [],
    });

    socket.emit("game-created", {
      pin: game.pin,
    });
  });

  socket.on("join-game", (data) => {
    const { name, pin } = z
      .object({
        name: z.string().min(3).max(20),
        pin: z.string().length(6),
      })
      .parse(data);

    const game = games.find((game) => game.pin === pin);
    if (!game) {
      socket.emit("game-not-found");
      return;
    }

    game.addPlayer({
      host: false,
      id: socket.id,
      name,
      socket,
      needsAnswers: [],
    });

    game.sendEvent("player-joined", {
      players: game.serializePlayers(),
    });
  });

  const callback = () => {
    socket.removeListener("start-game", callback);
    const game = games.find((game) =>
      game.players.some((player) => player.id === socket.id)
    );
    if (!game) return;

    const player = game.players.find((player) => player.id === socket.id);
    if (!player) return;

    if (!player.host) return;

    game.startAnswerQuestions();
  };
  socket.on("start-game", callback);

  socket.onAny((event, ...args) => {
    console.log("event incomming", event, args);
    console.log(socket.listeners(event));
    if (socket.listeners(event).length === 0) {
      // This means no other listener has handled this event
      console.log(`Unhandled event: ${event}`, args);
      socket.emit("unhandled", { event, data: args });
    }
  });

  socket.on("disconnect", () => {
    const game = games.find((game) =>
      game.players.some((player) => player.id === socket.id)
    );

    if (!game) return;

    const player = game.players.find((player) => player.id === socket.id);
    if (!player) return;

    game.sendEvent("stop-game", {
      reason: player.host ? "Host disconnected" : "Player disconnected",
    });
    games = games.filter((g) => g !== game);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

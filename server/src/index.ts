import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { STCEvent } from "./game/event";
import { GameManager } from "./game/gameManager";
import { generateSocketCallback } from "./game/socketCallback";

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

const handleSocketCallback = generateSocketCallback(gameManager);

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

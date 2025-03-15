import { z } from "zod";
import { JoinGameState } from "./game/game1/joinGameState";
import { GameManager } from "./game/gameManager";
import { Data } from "./game/player";
import { FakeSocket } from "./game/test";

const gameManager = new GameManager();

const handleSocketCallback = (
  socket: FakeSocket,
  event: string,
  data: Data
) => {
  const game = gameManager.getGameFromPlayer(socket.id);

  // Debug
  if (event === "debug") {
    gameManager.games.forEach((game) => {
      console.log({
        players: game.players,
        pin: game.pin,
        hostId: game.hostId,
      });
    });
    return;
  }

  if (game) {
    const player = game.getPlayer(socket.id);
    if (!player) throw new Error("Something went wrong");

    const successfullyHandeled = game.onPlayerEvent(player, event, data);
    if (!successfullyHandeled) {
      throw new Error("Wrong game event: " + event);
    }
  } else {
    if (event === "host-game") {
      const game = gameManager.createGame();

      game.state = new JoinGameState(game);

      game.onServerEvent("host-game", {
        data,
        socket,
      });
    } else if (event === "join-game") {
      const { pin, name } = z
        .object({
          name: z.string().min(3),
          pin: z.string().length(6),
        })
        .parse(data);

      const game = gameManager.getGame(pin);

      if (game) {
        game.onServerEvent("join-game", {
          name,
          socket,
        });
      }
    } else {
      throw new Error("Wrong no game event: " + event);
    }
  }
};

const run = () => {
  const hostSocket = new FakeSocket("Socket 1");
  hostSocket.onAny((event, data) => {
    handleSocketCallback(hostSocket, event, data);
  });

  const playerSocket = new FakeSocket("Socket 2");
  playerSocket.onAny((event, data) =>
    handleSocketCallback(playerSocket, event, data)
  );

  hostSocket.sendEvent("host-game", { name: "Host player", rounds: 20 });
  const { data: data1, event } = hostSocket.eventLog.getLatets();
  const { pin } = z.object({ pin: z.string().length(6) }).parse(data1);

  if (event !== "game-player-join-game")
    throw new Error("Wrong event: " + event);

  playerSocket.sendEvent("join-game", { name: "Person player", pin });

  const { data: data2 } = playerSocket.eventLog.getLatets();
  const { players } = z
    .object({ players: z.object({ id: z.string(), name: z.string() }).array() })
    .parse(data2);
  console.log(players);
};
run();

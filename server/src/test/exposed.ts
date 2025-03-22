import { z } from "zod";
import { JoinGameState } from "../game/exposed/joinGameState";
import { GameManager } from "../game/gameManager";
import { Data } from "../game/player";
import { FakeSocket } from "./socket";
import { Game1 } from "../game/exposed/exposed";
import { CTSEvent, STCEvent } from "../game/event";

const gameManager = new GameManager();

const handleSocketCallback = (
  socket: FakeSocket,
  event: CTSEvent,
  data: Data
) => {
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

const run = () => {
  const hostSocket = new FakeSocket("Socket Host 1", true);
  hostSocket.onAny((event, data) => {
    handleSocketCallback(hostSocket, event, data);
  });

  const player1Socket = new FakeSocket("Socket 2", true);
  player1Socket.onAny((event, data) =>
    handleSocketCallback(player1Socket, event, data)
  );
  const player2Socket = new FakeSocket("Socket 3", true);
  player2Socket.onAny((event, data) =>
    handleSocketCallback(player2Socket, event, data)
  );

  hostSocket.sendEvent(CTSEvent.COMMON.HOST_GAME, {
    name: "Host player",
    questionsPerPlayer: 20,
  });
  const { data: data1, event } = hostSocket.eventLog.getLatets();
  const { pin } = z.object({ pin: z.string().length(6) }).parse(data1);

  if (event !== STCEvent.COMMON.PLAYER_JOINED_GAME)
    throw new Error("Wrong event: " + event);

  player1Socket.sendEvent(CTSEvent.COMMON.JOIN_GAME, {
    name: "Person 1 player",
    pin,
  });
  player2Socket.sendEvent(CTSEvent.COMMON.JOIN_GAME, {
    name: "Person 2 player",
    pin,
  });

  hostSocket.sendEvent(CTSEvent.COMMON.START_GAME, {});

  hostSocket.sendEvent(CTSEvent.EXPOSED.ANSWERED_QUESTIONS, {
    answers: [
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
    ],
  });
  player1Socket.sendEvent(CTSEvent.EXPOSED.ANSWERED_QUESTIONS, {
    answers: [
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
    ],
  });
  player2Socket.sendEvent(CTSEvent.EXPOSED.ANSWERED_QUESTIONS, {
    answers: [
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
      {
        type: "write-something",
        text: "Some random text",
      },
    ],
  });

  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});

  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});

  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});

  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});
  hostSocket.sendEvent(CTSEvent.EXPOSED.NEXT_QUESTION, {});

  hostSocket.sendEvent(CTSEvent.EXPOSED.END_GAME, {});
};
run();

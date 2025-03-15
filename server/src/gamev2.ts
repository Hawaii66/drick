import { z } from "zod";
import { JoinGameState } from "./game/game1/joinGameState";
import { GameManager } from "./game/gameManager";
import { Data } from "./game/player";
import { FakeSocket } from "./game/test";
import { Event } from "./game/event";
import { Game1 } from "./game/game1/game1";

const gameManager = new GameManager();

const handleSocketCallback = (socket: FakeSocket, event: Event, data: Data) => {
  const game = gameManager.getGameFromPlayer(socket.id);

  if (game) {
    const player = game.getPlayer(socket.id);
    if (!player) throw new Error("Something went wrong");

    const successfullyHandeled = game.onPlayerEvent(player, event, data);
    if (!successfullyHandeled) {
      throw new Error("Wrong game event: " + event);
    }
  } else {
    if (event === Event.HOST_GAME) {
      const game = gameManager.createGame("1");

      if (game instanceof Game1) {
        game.state = new JoinGameState(game);
      } else {
        throw new Error("Game init state not set");
      }

      game.onServerEvent(Event.HOST_GAME, {
        data,
        socket,
      });
    } else if (event === Event.JOIN_GAME) {
      const { pin, name } = z
        .object({
          name: z.string().min(3),
          pin: z.string().length(6),
        })
        .parse(data);

      const game = gameManager.getGame(pin);

      if (game) {
        game.onServerEvent(Event.JOIN_GAME, {
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

  hostSocket.sendEvent(Event.HOST_GAME, { name: "Host player", rounds: 20 });
  const { data: data1, event } = hostSocket.eventLog.getLatets();
  const { pin } = z.object({ pin: z.string().length(6) }).parse(data1);

  if (event !== Event.GAME_PLAYER_JOIN_GAME)
    throw new Error("Wrong event: " + event);

  player1Socket.sendEvent(Event.JOIN_GAME, { name: "Person 1 player", pin });
  player2Socket.sendEvent(Event.JOIN_GAME, { name: "Person 2 player", pin });

  hostSocket.sendEvent(Event.START_GAME, {});

  hostSocket.sendEvent(Event.GAME_PLAYER_ANSWERED_QUESTIONS, {
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
  player1Socket.sendEvent(Event.GAME_PLAYER_ANSWERED_QUESTIONS, {
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
  player2Socket.sendEvent(Event.GAME_PLAYER_ANSWERED_QUESTIONS, {
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

  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});

  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});

  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});
  hostSocket.sendEvent(Event.GAME_NEXT_QUESTION, {});

  hostSocket.sendEvent(Event.GAME_HOST_END_GAME, {});
};
run();

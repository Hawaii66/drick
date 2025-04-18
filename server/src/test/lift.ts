import { z } from "zod";
import { GameManager } from "../game/gameManager";
import { FakeSocket } from "./socket";
import { generateSocketCallback } from "src/game/socketCallback";
import { CTSEvent, STCEvent } from "src/common/event";

const gameManager = new GameManager();

const handleSocketCallback = generateSocketCallback(gameManager);

const run = () => {
  const hostSocket = new FakeSocket("Socket Host 1", true);
  hostSocket.onAny((event, data) => {
    handleSocketCallback(hostSocket, event, data);
  });

  const player1Socket = new FakeSocket("Socket 2", true);
  player1Socket.onAny((event, data) =>
    handleSocketCallback(player1Socket, event, data),
  );
  const player2Socket = new FakeSocket("Socket 3", true);
  player2Socket.onAny((event, data) =>
    handleSocketCallback(player2Socket, event, data),
  );

  hostSocket.sendEvent(CTSEvent.COMMON.HOST_GAME, {
    name: "Host player",
    rounds: 5,
    gameId: "lift",
  });
  const { data: data1, event } = hostSocket.eventLog.getLatets();
  const { pin } = z.object({ pin: z.string().length(6) }).parse(data1);

  if (event !== STCEvent.COMMON.PLAYER_JOINED_GAME)
    throw new Error("Wrong event: " + event);

  player1Socket.sendEvent(CTSEvent.COMMON.JOIN_GAME, {
    name: "Player 1",
    pin,
  });
  player2Socket.sendEvent(CTSEvent.COMMON.JOIN_GAME, {
    name: "Player 2",
    pin,
  });

  hostSocket.sendEvent(CTSEvent.COMMON.START_GAME, {});

  hostSocket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
  hostSocket.sendEvent(CTSEvent.LIFT.FINGER_UP, {});
  hostSocket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});

  player1Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
  player2Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});

  player1Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, {});

  setTimeout(() => {
    hostSocket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 15 });
    player2Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 25 });

    hostSocket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
    player1Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
    player2Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});

    setTimeout(() => {
      hostSocket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 10 });
      player1Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 20 });
      player2Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 30 });

      hostSocket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
      player1Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
      player2Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});

      setTimeout(() => {
        hostSocket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 10 });
        player1Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 20 });
        player2Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 30 });

        hostSocket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
        player1Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
        player2Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});

        setTimeout(() => {
          hostSocket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 10 });
          player1Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 20 });
          player2Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 30 });

          hostSocket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
          player1Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});
          player2Socket.sendEvent(CTSEvent.LIFT.FINGER_DOWN, {});

          setTimeout(() => {
            hostSocket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 10 });
            player1Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 20 });
            player2Socket.sendEvent(CTSEvent.LIFT.FINGER_UP, { time: 30 });
          }, 700);
        }, 700);
      }, 700);
    }, 700);
  }, 700);
};
run();

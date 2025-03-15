type Player = {
  name: string;
  id: string;
  socket: Socket;
};

type SocketPlayer = Player & {
  onEvent: (event: string, data: any) => void;
};

interface Socket {
  emit: <T>(event: string, data: T) => void;
}

abstract class GameState {
  game: Game;
  state: string;

  constructor(game: Game, state: string) {
    this.game = game;
    this.state = state;
  }

  abstract onPlayerEvent(player: Player, event: string, data: any): boolean;
  abstract onServerEvent(event: string, data: any): boolean;
}

class JoinGameState extends GameState {
  constructor(game: Game) {
    super(game, "join");
  }

  addPlayer(player: { id: string; socket: Socket; name: string }) {
    this.game.players.push({
      socket: player.socket,
      id: player.id,
      name: player.name,
    });

    player.socket.emit("game-player-join-game", {
      pin: this.game.pin,
      players: this.game.players.map((i) => ({ id: i.id, name: i.name })),
    });
  }

  onServerEvent(event: string, data: any): boolean {
    if (event === "host-game") {
      if (this.game.players.length > 0) {
        return false;
      }

      const socket = data.socket;
      const name = data.data.name;

      this.addPlayer({
        socket: data.socket,
        id: data.socket.id,
        name: name,
      });

      this.game.setHost(socket.id);
      return true;
    }

    if (event === "join-game") {
      if (this.game.players.length === 0) {
        return false;
      }

      const { socket, name } = data;

      this.addPlayer({
        socket: socket,
        id: socket.id,
        name: name,
      });
      return true;
    }

    return false;
  }

  onPlayerEvent(player: Player, event: string, data: any) {
    return false;
  }
}

class Game {
  players: Player[] = [];
  pin: string;
  hostId: string;
  state: GameState | null = null;

  constructor() {
    this.pin = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");
    this.hostId = "";
  }

  setHost(id: string) {
    this.hostId = id;
  }

  sendEventToPlayer<T>(id: string, event: string, data: T) {
    const player = this.players.find((player) => player.id === id);
    if (player) {
      player.socket.emit(event, data);
      return true;
    }

    return false;
  }

  sendEventToAllPlayers<T>(event: string, data: T) {
    this.players.forEach((player) => player.socket.emit(event, data));
  }

  getPlayer(id: string) {
    return this.players.find((player) => player.id === id);
  }

  hasPlayer(id: string) {
    return this.players.some((player) => player.id === id);
  }

  onPlayerEvent(player: Player, event: string, data: any) {
    if (!this.state) throw new Error("State not set");

    return this.state.onPlayerEvent(player, event, data);
  }

  onServerEvent(event: string, data: any) {
    if (!this.state) throw new Error("State not set");

    return this.state.onServerEvent(event, data);
  }

  changeState(state: GameState) {
    this.state = state;
  }
}

class GameManager {
  games: Game[] = [];

  getGame(pin: string) {
    return this.games.find((game) => game.pin === pin);
  }

  createGame() {
    const game = new Game();
    this.games.push(game);
    return game;
  }

  hasPlayerInGame(id: string) {
    return this.games.some((game) => game.hasPlayer(id));
  }

  getGameFromPlayer(id: string) {
    return this.games.find((i) => i.hasPlayer(id));
  }
}

const gameManager = new GameManager();

class EventLog {
  eventLog: { event: string; data: any }[] = [];

  getLatets() {
    return this.eventLog[this.eventLog.length - 1];
  }

  addLog(data: { event: string; data: any }) {
    this.eventLog.push(data);
  }

  toJSON() {
    return JSON.stringify(this.eventLog, null, 2);
  }
}

class FakeSocket {
  id: string;
  listeners: { event: string; callback: (data: any) => void }[] = [];
  onAnyListeners: ((event: string, data: any) => void)[] = [];
  eventLog: EventLog;

  constructor(id: string) {
    this.id = id;
    this.eventLog = new EventLog();
  }

  sendEvent(event: string, data: any) {
    this.onAnyListeners.forEach((d) => d(event, data));
    this.listeners.forEach((d) => d.event === event && d.callback(data));
  }

  emit(event: string, data: any) {
    this.eventLog.addLog({ event, data });
  }

  on(event: string, callback: (data: any) => void) {
    this.listeners.push({
      callback,
      event,
    });
  }

  onAny(callback: (event: string, data: any) => void) {
    this.onAnyListeners.push(callback);
  }
}

const handleSocketCallback = (socket: FakeSocket, event: string, data: any) => {
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
      const { pin, name } = data;
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
  const {
    data: { pin },
    event,
  } = hostSocket.eventLog.getLatets();

  if (event !== "game-player-join-game")
    throw new Error("Wrong event: " + event);

  playerSocket.sendEvent("join-game", { name: "Person player", pin });

  const {
    data: { players },
  } = playerSocket.eventLog.getLatets();
  console.log(players);
};
run();

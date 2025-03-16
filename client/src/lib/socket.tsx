import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { io, Socket } from "socket.io-client";

export class SocketHandler {
  private socket: Socket;
  private listeners: (() => void)[] = [];
  private state: { isConnected: boolean; id: string } = {
    isConnected: false,
    id: "",
  };

  setState(data: Partial<typeof this.state>) {
    this.state = {
      ...this.state,
      ...data,
    };
    this.notifyListeners();
  }

  constructor() {
    this.socket = io("http://localhost:3000");

    this.socket.on("connect", () => {
      this.setState({ isConnected: true, id: this.socket.id });
    });

    this.socket.on("disconnect", () => {
      this.setState({
        isConnected: false,
        id: "",
      });
    });
  }

  addListener = (listener: () => void) => {
    this.listeners.push(listener);

    return () => {
      this.listeners.filter((i) => i !== listener);
    };
  };

  notifyListeners = () => {
    this.listeners.forEach((a) => a());
  };

  getSnapshot = () => {
    return this.state;
  };

  emit<T>(event: string, data?: T) {
    this.socket.emit(event, data);
  }

  on<T>(event: string, callback: (data: T) => void) {
    this.socket.on(event, callback);
  }

  off<T>(event: string, callback: (data: T) => void) {
    this.socket.off(event, callback);
  }
}

export const socketHandler = new SocketHandler();

export const useSocket = () => socketHandler;

export const useSocketData = () => {
  const a = useSyncExternalStore(
    (callback) => socketHandler.addListener(callback),
    socketHandler.getSnapshot
  );

  return useMemo(() => a, [a]);
};

export function useSocketEvent<T>(event: string, initialValue: T) {
  const socket = useSocket();
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    const handler = (newData: T) => {
      setData(newData);
    };

    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, socket]);

  return data;
}

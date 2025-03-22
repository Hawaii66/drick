import { CTSEvent, STCEvent } from "./event";

export type Player<T> = {
  name: string;
  id: string;
  socket: Socket;
  metadata: T;
};

export interface Socket {
  emit: <T>(event: STCEvent, data: T) => void;
}

export type BasicSocket = {
  id: string;
  emit: (event: CTSEvent, data: Data) => void;
};

export type Data = unknown;

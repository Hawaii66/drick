import { STCEvent, CTSEvent } from "src/common/event";

export type Player<T> = {
  name: string;
  id: string;
  socket: Socket;
  metadata: T;
};

export interface Socket {
  emit: <T>(_event: STCEvent, _data: T) => void;
}

export type BasicSocket = {
  id: string;
  emit: (_event: CTSEvent, _data: Data) => void;
};

export type Data = unknown;

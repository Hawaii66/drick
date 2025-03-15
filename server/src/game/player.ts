import { Event } from "./event";

export type Player<T> = {
  name: string;
  id: string;
  socket: Socket;
  metadata: T;
};

export interface Socket {
  emit: <T>(event: Event, data: T) => void;
}

export type Data = unknown;

import { z } from "zod";

export type Player = {
  name: string;
  id: string;
  socket: Socket;
};

export interface Socket {
  emit: <T>(event: string, data: T) => void;
}

export type Data = unknown;

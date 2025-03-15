import { z } from "zod";
import { Event } from "./event";

export type Player = {
  name: string;
  id: string;
  socket: Socket;
};

export interface Socket {
  emit: <T>(event: Event, data: T) => void;
}

export type Data = unknown;

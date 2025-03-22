export type Player = {
  id: string;
  name: string;
};

export type Game = {
  players: Player[];
  pin: string;
};
import { z } from "zod";

export const SmallGame = z.union([
  z.object({
    type: z.literal("group-question"),
    question: z.string(),
  }),
  z.object({
    type: z.literal("group-challenge"),
    challenge: z.string(),
  }),
  z.object({
    type: z.literal("player-question"),
    question: z.string(),
    player: z.string(),
  }),
  z.object({
    type: z.literal("player-challenge"),
    challenge: z.string(),
    player: z.string(),
  }),
  z.object({
    type: z.literal("write-something"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("2-truths-1-lie"),
    truths: z.string().array(),
    lie: z.string(),
    player: z.string(),
  }),
]);

export type SmallGame = z.infer<typeof SmallGame>;

export const NeedsAnswers: SmallGame["type"][] = [
  "group-challenge",
  "group-question",
  "player-challenge",
  "player-question",
  "write-something",
  "2-truths-1-lie",
];

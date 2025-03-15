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
    type: z.literal("person-question"),
    question: z.string(),
    person: z.string(),
  }),
  z.object({
    type: z.literal("person-challenge"),
    challenge: z.string(),
    person: z.string(),
  }),
  z.object({
    type: z.literal("write-something"),
    text: z.string(),
  }),
  z.object({
    type: z.literal("2-truths-1-lie"),
    truths: z.string().array(),
    lie: z.string(),
  }),
]);

export type SmallGame = z.infer<typeof SmallGame>;

export const NeedsAnswers: SmallGame["type"][] = [
  "group-challenge",
  "group-question",
  "person-challenge",
  "person-question",
  "write-something",
  "2-truths-1-lie",
];

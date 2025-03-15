import { SmallGame } from "@/types/game";

export type UpdateAnswer = (
  type: SmallGame["type"],
  key: string,
  val: string
) => void;

export type GetAnswer = (type: SmallGame["type"], key: string) => string;

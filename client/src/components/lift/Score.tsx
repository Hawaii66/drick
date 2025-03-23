import { LobbyPlayer } from "@/types/player";
import { useState } from "react";
import ScoreTop3 from "./score/Top3";
import ScoreTopScore from "./score/TopScore";
import ScoreToEarly from "./score/ToEarly";
import Quit from "./score/Quit";

type Props = {
  score: { id: string; score: number }[];
  result: { id: string; time: number }[];
  players: LobbyPlayer[];
  toEarly: string[];
  onDone: () => void;
  hasEnded: boolean;
};

export default function Score({
  players,
  result,
  score,
  toEarly,
  onDone,
  hasEnded,
}: Props) {
  const [state, setState] = useState<"round" | "game" | "early" | "quit">(
    "round",
  );

  switch (state) {
    case "round":
      return (
        <ScoreTop3
          onNext={() => setState("game")}
          players={players}
          result={result}
        />
      );
    case "game":
      return (
        <ScoreTopScore
          onNext={() => {
            if (toEarly.length === 0) {
              if (hasEnded) {
                setState("quit");
              } else {
                onDone();
              }
            } else {
              setState("early");
            }
          }}
          onPrev={() => setState("round")}
          players={players}
          score={score}
          hasEnded={hasEnded}
        />
      );

    case "early":
      return (
        <ScoreToEarly
          onPrev={() => setState("game")}
          early={toEarly}
          onNext={() => {
            if (hasEnded) {
              setState("quit");
            } else {
              onDone();
            }
          }}
          players={players}
        />
      );
    case "quit":
      return (
        <Quit
          onPrev={() => {
            if (toEarly.length === 0) {
              setState("game");
            } else {
              setState("early");
            }
          }}
        />
      );
  }
}

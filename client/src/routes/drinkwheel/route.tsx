import { DRINK_WHEEL_CHALLENGES } from "@/lib/drinkWheel";
import Done from "@/pages/drinkwheel/Done";
import DrinkWheel from "@/pages/drinkwheel/DrinkWheel";
import SelectPlayers from "@/pages/drinkwheel/SelectPlayers";
import ShowChallenges from "@/pages/drinkwheel/ShowChallenges";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/drinkwheel")({
  component: RouteComponent,
});

function RouteComponent() {
  const [state, setState] = useState<
    "players" | "challenges" | "wheel" | "done"
  >("players");
  const [players, setPlayers] = useState(0);
  const [challenges, setChallenges] = useState<string[]>([]);

  switch (state) {
    case "players":
      return (
        <SelectPlayers
          onSelect={(p) => {
            setPlayers(p);
            setState("challenges");
          }}
        />
      );
    case "challenges":
      return (
        <ShowChallenges
          challenges={DRINK_WHEEL_CHALLENGES}
          players={players}
          onStart={(c) => {
            setChallenges(c);
            setState("wheel");
          }}
        />
      );
    case "wheel":
      return (
        <DrinkWheel onDone={() => setState("done")} challenges={challenges} />
      );
    case "done":
      return <Done replay={() => setState("players")} />;
  }
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  onSelect: (players: number) => void;
};

export default function SelectPlayers({ onSelect }: Props) {
  const [playersStr, setPlayersStr] = useState("4");
  const players = parseInt(playersStr);

  return (
    <div className="flex justify-center items-center bg-[url(/bg/drinkwheel.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-2 w-full">
            <Label>Number of players</Label>
            <Input
              type="number"
              inputMode="numeric"
              value={playersStr}
              onChange={(e) => setPlayersStr(e.target.value)}
            />
            <p className="px-2 text-sm">Recomended to select 3 - 15 player</p>
          </div>
          <Button
            disabled={isNaN(players) || players < 3 || players > 100}
            className="bg-purple-600 px-8 py-2 text-lg"
            onClick={() => {
              onSelect(players);
            }}
          >
            Show Challenges
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

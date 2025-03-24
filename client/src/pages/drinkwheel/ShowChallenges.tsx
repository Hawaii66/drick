import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

type Props = {
  players: number;
  challenges: string[];
  onStart: (challenges: string[]) => void;
};

const getRandomChallenges = (challenges: string[], count: number) => {
  return [...challenges].sort(() => Math.random() - 0.5).slice(0, count);
};

export default function ShowChallenges({
  challenges,
  players,
  onStart,
}: Props) {
  const [toPlay, setToPlay] = useState(
    getRandomChallenges(challenges, players),
  );

  return (
    <div className="flex justify-center items-center bg-[url(/bg/drinkwheel.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Selected Challenges</CardTitle>
          <CardDescription>
            Theses are the challenges you will play with. Each player will get
            one challenge
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-2">
          {toPlay.map((i) => (
            <p key={i}>- {i}</p>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col justify-evenly items-center gap-4">
          <Button
            onClick={() => setToPlay(getRandomChallenges(challenges, players))}
          >
            New Challenges
          </Button>
          <Button
            disabled={isNaN(players) || players < 3 || players > 100}
            className="bg-purple-600 px-8 py-2 text-lg"
            onClick={() => {
              onStart(toPlay);
            }}
          >
            Spin The Wheel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

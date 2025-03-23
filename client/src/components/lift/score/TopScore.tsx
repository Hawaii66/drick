import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useSocketData } from "@/lib/socket";
import { LobbyPlayer } from "@/types/player";

export type Props = {
  score: { id: string; score: number }[];
  players: LobbyPlayer[];
  onNext: () => void;
  onPrev: () => void;
  hasEnded: boolean;
};

const drinks = [3, 2, 1];

export default function ScoreTopScore({
  players,
  score,
  onNext,
  onPrev,
  hasEnded,
}: Props) {
  const { id } = useSocketData();
  const own = score.find((i) => i.id === id);
  if (!own) {
    throw new Error("Missing own score");
  }

  return (
    <div className="flex justify-center items-center bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{hasEnded ? "Final scores" : "Top 3 overall"}</CardTitle>
          <CardDescription>
            Here are the players with the fastest reaction times this game
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-2">
          {score
            .sort((a, b) => a.score - b.score)
            .slice(0, 3)
            .map((score, idx) => {
              const player = players.find((i) => i.id === score.id);
              return (
                <p key={score.id}>
                  {idx + 1}. {player?.name}: {score.score} → give out{" "}
                  {drinks[idx] * (hasEnded ? 3 : 1)} drinks
                </p>
              );
            })}
          <Separator />
          <p>Your score: {own.score}</p>
        </CardContent>
        <CardFooter className="flex flex-row justify-evenly items-center">
          <Button onClick={onPrev}>Previous</Button>
          <Button onClick={onNext}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

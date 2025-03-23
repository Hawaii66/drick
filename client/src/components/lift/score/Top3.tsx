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
  result: { id: string; time: number }[];
  players: LobbyPlayer[];
  onNext: () => void;
};

const drinks = [6, 3, 1];

export default function ScoreTop3({ players, result, onNext }: Props) {
  const { id } = useSocketData();
  const own = result.find((i) => i.id === id);
  if (!own) {
    throw new Error("Missing own score");
  }

  return (
    <div className="flex justify-center items-center bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Top 3 this round</CardTitle>
          <CardDescription>
            Here are the players with the fastest reaction times this round
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-2">
          {result
            .sort((a, b) => a.time - b.time)
            .slice(0, 3)
            .map((score, idx) => {
              const player = players.find((i) => i.id === score.id);
              return (
                <p key={score.id}>
                  {idx + 1}. {player?.name}: {score.time}ms → give out{" "}
                  {drinks[idx]} drinks
                </p>
              );
            })}
          <Separator />
          {own.time === -1 ? (
            <p>You released to early</p>
          ) : (
            <p>Your time: {own.time} ms</p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={onNext}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

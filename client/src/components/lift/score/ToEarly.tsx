import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { LobbyPlayer } from "@/types/player";

export type Props = {
  early: string[];
  players: LobbyPlayer[];
  onNext: () => void;
  onPrev: () => void;
};

export default function ScoreToEarly({
  onPrev,
  players,
  early,
  onNext,
}: Props) {
  return (
    <div className="flex justify-center items-center bg-[url(/bg/lift.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Released To Early</CardTitle>
          <CardDescription>
            Here are the players that released to early and should be punished
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-8">
          {early.map((id) => {
            const player = players.find((i) => i.id === id);
            return <p key={id}>- {player?.name}: takes 5 drinks</p>;
          })}
        </CardContent>
        <CardFooter className="flex flex-row justify-evenly items-center">
          <Button onClick={onPrev}>Previous</Button>
          <Button onClick={onNext}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

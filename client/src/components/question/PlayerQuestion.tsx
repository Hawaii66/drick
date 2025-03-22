import { LobbyPlayer } from "@/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  question: string;
  player: LobbyPlayer;
};

export default function PlayerQuestion({ question, player }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Player Question</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{player.name}: </p>
        <p>{question}</p>
      </CardContent>
    </Card>
  );
}

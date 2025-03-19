import { LobbyPlayer } from "@/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  question: string;
  player: LobbyPlayer;
};

export default function PersonQuestion({ question, player }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Person Question</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{player.name}: </p>
        <p>{question}</p>
      </CardContent>
    </Card>
  );
}

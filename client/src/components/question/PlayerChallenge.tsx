import { LobbyPlayer } from "@/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  challenge: string;
  player: LobbyPlayer;
};

export default function PlayerChallenge({ challenge, player }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Player Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{player.name}: </p>
        <p>{challenge}</p>
      </CardContent>
    </Card>
  );
}

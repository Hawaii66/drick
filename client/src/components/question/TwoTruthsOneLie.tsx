import { LobbyPlayer } from "@/types/player";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  player: LobbyPlayer;
  lie: string;
  truths: string[];
};

export default function TwoTruthsOneLie({ lie, player, truths }: Props) {
  const text = [...truths, lie].sort(() => Math.random() - 0.5);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>2 truths 1 lie</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{player.name}: </p>
        {text.map((t, i) => (
          <p key={i}>- {t}</p>
        ))}
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { LobbyPlayer } from "@/types/player";
import { Label } from "@radix-ui/react-label";

type Props = {
  players: LobbyPlayer[];
  pin: string;
};

export default function PageLobby({ players, pin }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lobby</CardTitle>
          <CardDescription>
            Waiting for players to join the game.
          </CardDescription>
          {players.length < 4 && (
            <CardDescription>
              At least 4 players are required to start the game.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Button disabled={players.length < 4}>Start Game</Button>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent>
          <div className="flex flex-col gap-2 w-full">
            <Label>Game PIN</Label>
            <InputOTP value={pin} maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Players</CardTitle>
          <CardDescription>
            Players that have joined the game: {players.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-row flex-wrap gap-2">
          {players.map((player) => (
            <Badge key={player.id}>{player.name}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

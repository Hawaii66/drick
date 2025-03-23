import { STCEvent, CTSEvent } from "@/common/event";
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
import { useSocket, useSocketData, useSocketEvent } from "@/lib/socket";
import { LobbyPlayer } from "@/types/player";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "@tanstack/react-router";
import { Share } from "lucide-react";
import { useEffect } from "react";

type Props = {
  players: LobbyPlayer[];
  pin: string;
};

export default function PageLobby({ players, pin }: Props) {
  const { id } = useSocketData();
  const isHost = players.some((i) => i.isHost && i.id === id);

  const socket = useSocket();
  const data = useSocketEvent<{ pin: string }>(STCEvent.COMMON.START_GAME, {
    pin: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data.pin !== "") {
      navigate({
        to: "/promptparty/active/$pin/answer",
        params: {
          pin: data.pin,
        },
      });
    }
  }, [data, navigate]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg/promptparty.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Lobby</CardTitle>
          <CardDescription>
            Waiting for players to join the game.
          </CardDescription>
          {players.length < 3 && (
            <CardDescription>
              At least 3 players are required to start the game.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isHost && (
            <Button
              onClick={() => {
                socket.emit(CTSEvent.COMMON.START_GAME, {});
              }}
              disabled={players.length < 3}
            >
              Start Game
            </Button>
          )}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row justify-between items-center w-full">
              <Label>Game PIN</Label>
              <Button
                variant={"link"}
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${import.meta.env.VITE_CLIENT_URL}/promptparty/join-game?pin=${pin}`,
                  )
                }
              >
                <Share />
              </Button>
            </div>
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

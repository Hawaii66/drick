import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { CTSEvent, STCEvent } from "@/lib/event";
import { useExposedGame } from "@/lib/exposed";
import { useSocket, useSocketEvent } from "@/lib/socket";
import { LobbyPlayer } from "@/types/player";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Props = {
  defaultPin?: string;
};

export default function PageJoinGame({ defaultPin }: Props) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState(defaultPin ?? "");

  const socket = useSocket();
  const navigate = useNavigate();
  const { setState } = useExposedGame();

  const onConnect = useSocketEvent<{ players: LobbyPlayer[]; pin: string }>(
    STCEvent.COMMON.PLAYER_JOINED_GAME,
    { pin: "", players: [] }
  );
  useEffect(() => {
    if (onConnect.pin !== "") {
      setState({
        inGame: true,
        pin: onConnect.pin,
        players: onConnect.players,
      });
      navigate({
        to: "/exposed/active/lobby",
      });
    }
  }, [onConnect, navigate, setState]);

  return (
    <div className="flex justify-center items-center bg-[url(/bg.svg)] w-screen h-screen">
      <Card>
        <CardContent className="flex flex-col items-center gap-8">
          <div className="flex flex-col gap-2 w-full">
            <Label>Username</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label>Game PIN</Label>
            <InputOTP value={pin} onChange={(e) => setPin(e)} maxLength={6}>
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
          <Button
            disabled={name.trim().length < 3 || pin.length !== 6}
            className="bg-purple-600 px-8 py-2 text-lg"
            onClick={() =>
              socket.emit(CTSEvent.COMMON.JOIN_GAME, {
                pin,
                name,
              })
            }
          >
            Join Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

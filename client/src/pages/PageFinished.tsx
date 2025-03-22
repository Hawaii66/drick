import { CTSEvent, STCEvent } from "@/common/event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useExposedGame } from "@/lib/exposed";
import { useSocket, useSocketData, useSocketEvent } from "@/lib/socket";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function PageFinished() {
  const socket = useSocket();
  const { players } = useExposedGame();
  const { id } = useSocketData();
  const isHost = players.some((i) => i.isHost && i.id === id);

  const navigate = useNavigate();
  const onEnded = useSocketEvent<object | null>(STCEvent.EXPOSED.ENDED, null);
  useEffect(() => {
    if (!onEnded) return;

    navigate({
      to: "/",
    });
  }, [onEnded, navigate]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Thanks for playing!</CardTitle>
          {isHost ? (
            <CardDescription>
              The game has ended. You can close the game now.
            </CardDescription>
          ) : (
            <CardDescription>
              The game has ended. Wait for the host to close the game.
            </CardDescription>
          )}
        </CardHeader>
        {isHost && (
          <CardFooter>
            <Button onClick={() => socket.emit(CTSEvent.EXPOSED.END_GAME, {})}>
              Quit game
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}

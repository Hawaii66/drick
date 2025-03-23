import { CTSEvent, STCEvent } from "@/common/event";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePromptPartyGame } from "@/lib/promptparty";
import { useSocket, useSocketEvent } from "@/lib/socket";
import { LobbyPlayer } from "@/types/player";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export default function PageHostGame() {
  const [name, setName] = useState("");
  const [questionsPerPlayerStr, setQuestionsPerPlayerStr] = useState("4");
  const questionsPerPlayer = parseInt(questionsPerPlayerStr);

  const socket = useSocket();
  const navigate = useNavigate();
  const { setState } = usePromptPartyGame();

  const onConnect = useSocketEvent<{ players: LobbyPlayer[]; pin: string }>(
    STCEvent.COMMON.PLAYER_JOINED_GAME,
    { pin: "", players: [] },
  );
  useEffect(() => {
    if (onConnect.pin !== "") {
      setState({
        inGame: true,
        pin: onConnect.pin,
        players: onConnect.players,
      });
      navigate({
        to: "/promptparty/active/lobby",
      });
    }
  }, [onConnect, navigate, setState]);

  return (
    <div className="flex justify-center items-center bg-[url(/bg.svg)] w-screen h-screen">
      <Card className="mx-8">
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
            <Label>Number of questions for each player</Label>
            <Input
              type="number"
              inputMode="numeric"
              value={questionsPerPlayerStr}
              onChange={(e) => setQuestionsPerPlayerStr(e.target.value)}
            />
            <p className="px-2 text-sm">
              Recomended to select 3 - 5 questions per player
            </p>
          </div>
          <Button
            disabled={
              name.trim().length < 3 ||
              isNaN(questionsPerPlayer) ||
              questionsPerPlayer < 2 ||
              questionsPerPlayer > 100
            }
            className="bg-purple-600 px-8 py-2 text-lg"
            onClick={() => {
              socket.emit(CTSEvent.COMMON.HOST_GAME, {
                questionsPerPlayer,
                name,
              });
            }}
          >
            Create Game
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

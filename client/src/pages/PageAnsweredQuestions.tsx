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
import { useSocket, useSocketData, useSocketEvent } from "@/lib/socket";
import { LobbyPlayer } from "@/types/player";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

type Props = {
  players: LobbyPlayer[];
  totalPlayers: number;
};

export default function PageAnsweredQuestions({
  players,
  totalPlayers,
}: Props) {
  const { id } = useSocketData();
  const isHost = players.some((i) => i.isHost && i.id === id);

  const socket = useSocket();
  const navigate = useNavigate();

  const showQuestion = useSocketEvent(STCEvent.EXPOSED.SHOW_QUESTION, null);

  useEffect(() => {
    if (showQuestion) {
      navigate({
        to: "/exposed/active/$pin/show",
        from: "/exposed/active/$pin/has-answered",
      });
    }
  }, [showQuestion, navigate]);

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Waiting lounge</CardTitle>
          <CardDescription>
            Waiting for players to answer all questions.
          </CardDescription>
          {players.length !== totalPlayers && (
            <CardDescription>
              All players must answer the questions before the game can start.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {isHost && (
            <Button
              onClick={() => {
                socket.emit(CTSEvent.EXPOSED.NEXT_QUESTION, {});
              }}
              disabled={players.length !== totalPlayers}
            >
              Show Questions
            </Button>
          )}
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Players</CardTitle>
          <CardDescription>
            Players that have answered the questions: {players.length}
          </CardDescription>
          <CardDescription>
            Players that have not answered the questions:{" "}
            {totalPlayers - players.length}
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

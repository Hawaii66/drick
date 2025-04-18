import { STCEvent } from "@/common/event";
import { useLiftGame } from "@/lib/lift";
import { useSocketEvent } from "@/lib/socket";
import PageLobby from "@/pages/lift/PageLobby";
import { LobbyPlayer } from "@/types/player";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/lift/active/lobby")({
  component: RouteComponent,
});

function RouteComponent() {
  const onConnect = useSocketEvent<{
    players: LobbyPlayer[];
    pin: string;
  } | null>(STCEvent.COMMON.PLAYER_JOINED_GAME, null);
  const { pin, players, setState } = useLiftGame();

  useEffect(() => {
    if (!onConnect) return;

    setState({
      pin,
      players: onConnect.players,
      inGame: true,
    });
  }, [onConnect, setState, pin]);

  return <PageLobby pin={pin} players={players} />;
}

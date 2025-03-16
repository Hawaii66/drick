import { STCEvent } from "@/lib/event";
import { useSocketEvent } from "@/lib/socket";
import PageLobby from "@/pages/PageLobby";
import { LobbyPlayer } from "@/types/player";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exposed/lobby")({
  component: RouteComponent,
});

function RouteComponent() {
  const { players, pin } = useSocketEvent<{
    players: LobbyPlayer[];
    pin: string;
  }>(STCEvent.COMMON.PLAYER_JOINED_GAME, { players: [], pin: "" });

  return <PageLobby pin={pin} players={players} />;
}

import PageHostGame from "@/pages/promptParty/PageHostGame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promptparty/host-game")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageHostGame />;
}

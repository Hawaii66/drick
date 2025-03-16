import PageHostGame from "@/pages/PageHostGame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exposed/host-game")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageHostGame />;
}

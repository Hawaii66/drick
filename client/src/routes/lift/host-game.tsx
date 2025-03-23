import PageHostGame from "@/pages/lift/PageHostGame";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/lift/host-game")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageHostGame />;
}

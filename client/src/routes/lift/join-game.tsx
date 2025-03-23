import PageJoinGame from "@/pages/lift/PageJoinGame";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/lift/join-game")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      pin: z.coerce.string().length(6).catch(""),
    }),
  ),
});

function RouteComponent() {
  const { pin } = Route.useSearch();

  return <PageJoinGame defaultPin={pin} />;
}

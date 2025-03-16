import PageJoinGame from "@/pages/PageJoinGame";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/join-game")({
  component: RouteComponent,
  validateSearch: zodValidator(
    z.object({
      pin: z.coerce.string().length(6).catch(""),
    })
  ),
});

function RouteComponent() {
  const { pin } = Route.useSearch();

  return <PageJoinGame defaultPin={pin} />;
}

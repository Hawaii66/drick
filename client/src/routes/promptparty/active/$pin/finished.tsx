import PageFinished from "@/pages/promptParty/PageFinished";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promptparty/active/$pin/finished")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageFinished />;
}

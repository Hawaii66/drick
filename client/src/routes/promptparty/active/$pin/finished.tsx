import PageFinished from "@/pages/PageFinished";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promptparty/active/$pin/finished")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageFinished />;
}

import PromptPartyGameWrapper from "@/lib/promptparty";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/promptparty")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <PromptPartyGameWrapper>
      <Outlet />
    </PromptPartyGameWrapper>
  );
}

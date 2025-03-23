import LiftGameWrapper from "@/lib/lift";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/lift")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LiftGameWrapper>
      <Outlet />
    </LiftGameWrapper>
  );
}

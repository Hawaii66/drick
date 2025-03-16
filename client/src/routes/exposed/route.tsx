import ExposedGameWrapper from "@/lib/exposed";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/exposed")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ExposedGameWrapper>
      <Outlet />
    </ExposedGameWrapper>
  );
}

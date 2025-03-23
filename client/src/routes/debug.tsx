import PageFinger from "@/pages/lift/PageFinger";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/debug")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageFinger />;
}

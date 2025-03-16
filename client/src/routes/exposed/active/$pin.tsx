import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exposed/active/$pin")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pin } = Route.useParams();

  return <div>Hello "/exposed/active/$pin"! {pin}</div>;
}

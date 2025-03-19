import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/exposed/active/$pin/show')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/exposed/active/$pin/show"!</div>
}

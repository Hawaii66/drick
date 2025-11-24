import CreateGame from '@/components/live/CreateGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live/anonymous/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateGame />
}

import CenterScreen from '@/components/CenterScreen'
import CreateGame from '@/components/live/anonymous/CreateGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live/anonymous/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CenterScreen> <CreateGame /></CenterScreen>
}

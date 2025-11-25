import CenterScreen from '@/components/CenterScreen'
import CreateGame from '@/components/live/reactionTime/CreateGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live/reaction-time/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CenterScreen> <CreateGame /></CenterScreen>
}

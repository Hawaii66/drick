import JoinGame from '@/components/live/JoinGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live/anonymous/join')({
    component: RouteComponent,
})

function RouteComponent() {
    return <JoinGame />
}

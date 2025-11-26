import CenterScreen from '@/components/CenterScreen'
import CreateGame from '@/components/live/impostor/CardCreateGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live/impostor/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CenterScreen> <CreateGame /></CenterScreen>
}

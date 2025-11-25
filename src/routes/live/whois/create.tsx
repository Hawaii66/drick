import CenterScreen from '@/components/CenterScreen'
import CreateGame from '@/components/live/whoIs/CardCreateGame'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/live/whois/create')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CenterScreen><CreateGame /></CenterScreen>
}

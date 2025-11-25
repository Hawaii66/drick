import CenterScreen from '@/components/CenterScreen'
import CardSalen from '@/components/local/salen/CardSalen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/local/salen/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CenterScreen><CardSalen /></CenterScreen>
}

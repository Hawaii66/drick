import CenterScreen from '@/components/CenterScreen'
import CardWaterfall from '@/components/local/waterfall/CardWaterfall'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/local/waterfall/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CenterScreen><CardWaterfall /></CenterScreen>
}

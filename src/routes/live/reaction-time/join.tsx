import { createFileRoute, useRouter } from '@tanstack/react-router'
import CenterScreen from '@/components/CenterScreen'
import JoinGame from '@/components/live/JoinGame'

export const Route = createFileRoute('/live/reaction-time/join')({
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()
    return <CenterScreen><JoinGame onJoin={(id) => router.navigate({
        to: "/live/reaction-time/$id",
        params: { id }
    })} /></CenterScreen>
}

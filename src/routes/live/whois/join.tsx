import CenterScreen from '@/components/CenterScreen'
import JoinGame from '@/components/live/JoinGame'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/live/whois/join')({
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()

    return <CenterScreen>
        <JoinGame onJoin={id => router.navigate({
            to: "/live/whois/$id",
            params: {
                id
            }
        })} />
    </CenterScreen>
}

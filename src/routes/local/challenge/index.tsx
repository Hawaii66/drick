import CenterScreen from '@/components/CenterScreen'
import LocalChallenge from '@/components/local/challenge/LocalChallenge'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/local/challenge/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <CenterScreen>
        <LocalChallenge />
    </CenterScreen>
}

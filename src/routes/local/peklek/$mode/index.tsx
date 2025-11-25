import CenterScreen from '@/components/CenterScreen'
import CardPeklek from '@/components/local/peklek/CardPeklek'
import { PeklekTypeToChallenges } from '@/lib/local/peklek'
import { shuffle } from '@/lib/utils'
import { PeklekTypes } from '@/types/local/peklek'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/local/peklek/$mode/')({
    component: RouteComponent,
})

function RouteComponent() {
    const mode = Route.useParams().mode
    const challenges = PeklekTypeToChallenges(mode as typeof PeklekTypes[number])

    return <CenterScreen> <CardPeklek challenges={shuffle(challenges)} /></CenterScreen>
}

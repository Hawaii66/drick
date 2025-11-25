import CenterScreen from '@/components/CenterScreen'
import CardSelectPeklek from '@/components/local/peklek/CardSelectPeklek'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/local/peklek/')({
    component: RouteComponent,
})

function RouteComponent() {
    const router = useRouter()

    return <CenterScreen> <CardSelectPeklek onConfigured={(name) => router.navigate({
        to: "/local/peklek/$mode",
        params: {
            mode: name
        }
    })} /></CenterScreen>
}

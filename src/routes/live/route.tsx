import { GameContextProvider } from '@/lib/gameContext'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/live')({
    component: RouteComponent,
})

function RouteComponent() {
    return <>
        <GameContextProvider>
        <Outlet />
</GameContextProvider>
    </>
}

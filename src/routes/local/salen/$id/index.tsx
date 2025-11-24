import CardSong from '@/components/local/salen/CardSong'
import { SalenSongIdToSong } from '@/lib/local/salen'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/local/salen/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = Route.useParams().id
    const song = SalenSongIdToSong(id)

    return <CardSong song={song} />
}

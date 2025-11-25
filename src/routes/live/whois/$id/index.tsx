import CenterScreen from '@/components/CenterScreen'
import GameCompleted from '@/components/GameCompleted'
import GameSceneSwitcher, { GameDataStateSwitch, GameStateSwitch } from '@/components/GameSceneSwitcher'
import SelectPlayer from '@/components/live/SelectPlayer'
import CardEnterPerson from '@/components/live/whoIs/CardEnterPerson'
import CardGameLobby from '@/components/live/whoIs/CardLobby'
import CardViewOtherPlayers from '@/components/live/whoIs/CardViewOtherPlayers'
import CardWaiting from '@/components/live/whoIs/CardWaiting'
import { useGameContext } from '@/lib/gameContext'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { GameState, WhoIsGameState } from 'convex/types'

export const Route = createFileRoute('/live/whois/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = Route.useParams().id

    const game = useQuery(api.live.whoIs.getGame, { id: id as Id<"games"> })
    const player = useGameContext().player

    if (!game) {
        return <div className="flex justify-center items-center h-full p-4">
            <div>Laddar...</div>
        </div>
    }

    if (!player) {
        return <CenterScreen> <SelectPlayer game={game} /></CenterScreen>
    }

    return <CenterScreen> <GameSceneSwitcher game={game}>
        <GameStateSwitch state={GameState.WAITING_FOR_PLAYERS}>
            <CardGameLobby game={game} />
        </GameStateSwitch>
        <GameStateSwitch state={GameState.IN_PROGRESS}>
            <GameDataStateSwitch state={WhoIsGameState.ENTER_PERSON}>
                {game.data.hasEnteredPerson[player]!==undefined ? <CardWaiting game={game} /> : <CardEnterPerson game={game} />}
            </GameDataStateSwitch>
            <GameDataStateSwitch state={WhoIsGameState.VIEW_OTHER_PLAYERS}>
                <CardViewOtherPlayers game={game} />
            </GameDataStateSwitch>
            <GameDataStateSwitch state={WhoIsGameState.FINISHED}>
                <GameCompleted />
            </GameDataStateSwitch>
        </GameStateSwitch>
    </GameSceneSwitcher></CenterScreen>
}


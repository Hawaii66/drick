import CenterScreen from '@/components/CenterScreen'
import GameCompleted from '@/components/GameCompleted'
import GameSceneSwitcher, { GameDataStateSwitch, GameStateSwitch } from '@/components/GameSceneSwitcher'
import CardEnterAnswer from '@/components/live/impostor/CardEnterAnswer'
import CardGameLobby from '@/components/live/impostor/CardLobby'
import CardViewAnswers from '@/components/live/impostor/CardViewAnswers'
import CardWaiting from '@/components/live/impostor/CardWaiting'
import SelectPlayer from '@/components/live/SelectPlayer'
import { useGameContext } from '@/lib/gameContext'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { GameState, ImpostorGameState } from 'convex/types'

export const Route = createFileRoute('/live/impostor/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = Route.useParams().id

    const game = useQuery(api.live.impostor.getGame, { id: id as Id<"games"> })
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
            <GameDataStateSwitch state={ImpostorGameState.ENTER_ANSWER}>
                {game.data.answers[player] !== undefined ? <CardWaiting game={game} /> : <CardEnterAnswer game={game} />}
            </GameDataStateSwitch>
            <GameDataStateSwitch state={[ImpostorGameState.VIEW_ANSWERS, ImpostorGameState.IMPOSTOR_REVEAL]}>
                <CardViewAnswers game={game} />
            </GameDataStateSwitch>
            <GameDataStateSwitch state={ImpostorGameState.FINISHED}>
                <GameCompleted />
            </GameDataStateSwitch>
        </GameStateSwitch>
    </GameSceneSwitcher></CenterScreen>
}


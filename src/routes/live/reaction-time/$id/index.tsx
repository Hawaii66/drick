import CenterScreen from '@/components/CenterScreen'
import GameCompleted from '@/components/GameCompleted'
import GameSceneSwitcher, { GameDataStateSwitch, GameStateSwitch } from '@/components/GameSceneSwitcher'
import CardGameLobby from '@/components/live/reactionTime/CardGameLobby'
import CardReact from '@/components/live/reactionTime/CardReact'
import CardResult from '@/components/live/reactionTime/CardResult'
import SelectPlayer from '@/components/live/SelectPlayer'
import { useGameContext } from '@/lib/gameContext'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { GameState, ReactionTimeGameState } from 'convex/types'

export const Route = createFileRoute('/live/reaction-time/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = Route.useParams().id

    const game = useQuery(api.live.reactionTime.getGame, { id: id as Id<"games"> })
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
            <GameDataStateSwitch state={ReactionTimeGameState.REACTING}>
                {game.data.scores[player]===undefined?
                <CardReact game={game} />:<CardResult game={game} />}
            </GameDataStateSwitch>
            <GameDataStateSwitch state={ReactionTimeGameState.RESULTS}>
                <CardResult game={game} />
            </GameDataStateSwitch>
            <GameDataStateSwitch state={ReactionTimeGameState.FINISHED}>
                <GameCompleted />
            </GameDataStateSwitch>
        </GameStateSwitch>
    </GameSceneSwitcher></CenterScreen>
}

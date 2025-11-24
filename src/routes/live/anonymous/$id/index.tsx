import CenterScreen from '@/components/CenterScreen'
import GameCompleted from '@/components/GameCompleted'
import GameSceneSwitcher, { GameDataStateSwitch, GameStateSwitch } from '@/components/GameSceneSwitcher'
import AnswerQuestions from '@/components/live/anonymous/AnswerQuestions'
import EnterQuestion from '@/components/live/anonymous/EnterQuestion'
import GameLobby from '@/components/live/GameLobby'
import SelectPlayer from '@/components/live/SelectPlayer'
import { useGameContext } from '@/lib/gameContext'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { AnonymouseGameState, GameState } from 'convex/types'

export const Route = createFileRoute('/live/anonymous/$id/')({
    component: RouteComponent,
})

function RouteComponent() {
    const id = Route.useParams().id

    const game = useQuery(api.live.anonymous.getGame, { id: id as Id<"games"> })
    const player = useGameContext().player

    if (!game) {
        return <div className="flex justify-center items-center h-full p-4">
            <div>Loading...</div>
        </div>
    }

    if (!player) {
        return <CenterScreen> <SelectPlayer game={game} /></CenterScreen>
    }

    return <CenterScreen> <GameSceneSwitcher game={game}>
        <GameStateSwitch state={GameState.WAITING_FOR_PLAYERS}>
            <GameLobby game={game} />
        </GameStateSwitch>
        <GameStateSwitch state={GameState.IN_PROGRESS}>
            <GameDataStateSwitch state={AnonymouseGameState.ENTER_QUESTIONS}>
                <EnterQuestion game={game} />
            </GameDataStateSwitch>
            <GameDataStateSwitch state={AnonymouseGameState.ANSWER_QUESTIONS}>
                <AnswerQuestions game={game} /> 
            </GameDataStateSwitch>
            <GameDataStateSwitch state={AnonymouseGameState.FINISHED}>
                <GameCompleted />
            </GameDataStateSwitch>
       </GameStateSwitch>
    </GameSceneSwitcher></CenterScreen>
}

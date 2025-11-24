import GameCompleted from '@/components/GameCompleted'
import GameError from '@/components/GameError'
import AnswerQuestions from '@/components/live/anonymous/AnswerQuestions'
import EnterQuestion from '@/components/live/anonymous/EnterQuestion'
import GameLobby from '@/components/live/GameLobby'
import SelectPlayer from '@/components/live/SelectPlayer'
import { useGameContext } from '@/lib/gameContext'
import { createFileRoute } from '@tanstack/react-router'
import { api } from 'convex/_generated/api'
import { Id } from 'convex/_generated/dataModel'
import { AnonymouseGameState } from 'convex/live/anonymous'
import { GameState } from 'convex/live/game'
import { useQuery } from 'convex/react'

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

    if(!player){
        return <SelectPlayer game={game} />
    }

    if(game.state === GameState.WAITING_FOR_PLAYERS){
        return <GameLobby game={game} />
    }

    if(game.data.state === AnonymouseGameState.ENTER_QUESTIONS){
        return <EnterQuestion game={game} />
    }

    if(game.data.state === AnonymouseGameState.ANSWER_QUESTIONS){
        return <AnswerQuestions game={game} />
    }

    if(game.data.state === AnonymouseGameState.FINISHED){
        return <GameCompleted />
    }

    return <GameError />
}

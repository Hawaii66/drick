import EnsureGameOwner from "@/components/EnsureGameOwner"
import Pending from "@/components/Pending"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGameContext } from "@/lib/gameContext"
import { ToastError } from "@/lib/utils"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { Id } from "convex/_generated/dataModel"
import { ImpostorGame, ImpostorGameState } from "convex/types"
import { useState } from "react"

type Props = {
    game: ImpostorGame
}

export default function CardViewAnswers({ game }: Props) {
    const [values, setValues] = useState(game.players)

    const { mutate: onNextRoundMutation, isPending: isPendingNextRound } = useMutation({
        mutationFn: useConvexMutation(api.live.impostor.onNextRound),
        onError: ToastError
    })
    const { mutate: onRevealImpostorMutation, isPending: isPendingReveal } = useMutation({
        mutationFn: useConvexMutation(api.live.impostor.onRevealImpostor),
        onError: ToastError
    })

    const player = useGameContext().player
    if (!player) {
        throw new Error("Missing game player")
    }

    return <Card>
        <CardHeader>
            <CardTitle>Vem är Impostor?</CardTitle>
            <CardDescription>Vems svar ser mest misstänkt ut?</CardDescription>
        </CardHeader>
        <CardContent>
            <h2>Fråga:</h2>
            <p className="mb-4 italic">{game.data.question.normal}</p>
            {game.data.state === ImpostorGameState.IMPOSTOR_REVEAL && <>
                <h2>Resultat:</h2>
                <p>Impostor: {game.data.impostor}</p>
                <p>- Om flest valde Impostor som sitt svar, dricker Impostor!</p>
                <p className="mb-4">- Om inte, dricker alla andra!</p>
            </>}
            <h2>Svar:</h2>
            <Accordion onValueChange={setValues} value={values} type="multiple" className="gap-2 flex flex-col">
                {Object.entries(game.data.answers).map(([player, answer], idx) => <AccordionItem key={idx.toString()} value={player}>
                    <AccordionTrigger style={{
                        backgroundColor: game.data.state === ImpostorGameState.IMPOSTOR_REVEAL && player === game.data.impostor ? "#A72703" : undefined
                    }}>
                        {player}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        {answer}
                    </AccordionContent>
                </AccordionItem>)}
            </Accordion>
        </CardContent>
        <CardFooter style={{
            justifyContent:game.data.state === ImpostorGameState.VIEW_ANSWERS?"flex-start": "flex-end"
        }}>
            <EnsureGameOwner game={game}>
                {game.data.state === ImpostorGameState.VIEW_ANSWERS ?
                    <Pending isPending={isPendingReveal}>
                        <Button onClick={() => onRevealImpostorMutation({
                            gameId: game._id as Id<"games">
                        })}>
                            Avslöja Impostor
                        </Button>
                    </Pending>
                    :
                    <Pending isPending={isPendingNextRound}>
                        <Button onClick={() => onNextRoundMutation({
                            gameId: game._id as Id<"games">
                        })}>
                            {game.data.currentRound + 1 >= game.data.rounds ? "Avsluta" : "Nästa Runda"}
                        </Button>
                    </Pending>
                }
            </EnsureGameOwner>
        </CardFooter>
    </Card>

}

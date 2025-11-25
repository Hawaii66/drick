import EnsureGameOwner from "@/components/EnsureGameOwner"
import { Accordion, AccordionContent, AccordionTrigger, AccordionItem } from "@/components/ui/accordion"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGameContext } from "@/lib/gameContext"
import { ToastError } from "@/lib/utils"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { Id } from "convex/_generated/dataModel"
import { WhoIsGame } from "convex/types"
import { useState } from "react"

type Props = {
    game:WhoIsGame
}

export default function CardViewOtherPlayers({ game }:Props){
    const [values, setValues] = useState(Array.from(Object.keys(game.data.playerToPerson)))

    const {mutate:onFinishGameMutation} = useMutation({
        mutationFn:useConvexMutation(api.live.whoIs.onFinish),
        onError:ToastError
    })

    const player = useGameContext().player
    if(!player){
        throw new Error("Missing game player")
    }

    return <Card>
        <CardHeader>
            <CardTitle>Who Is Play</CardTitle>
            <CardDescription>Each player can not see their own person</CardDescription>
            <CardDescription>Each player can ask one question at a time</CardDescription>
            <CardDescription>For each question take one sip</CardDescription>
            <CardDescription>First to guess their person wins</CardDescription>
        </CardHeader>
        <CardContent>
            <Accordion onValueChange={setValues} value={values} type="multiple" className="gap-2 flex flex-col">
                {Object.entries(game.data.playerToPerson).filter(i=>i[0]!==player).map(([player,person],idx)=><AccordionItem key={idx.toString()} value={player}>
                    <AccordionTrigger>
                        {player}
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        {person}
                    </AccordionContent>
                </AccordionItem>)}
            </Accordion>
        </CardContent>
        <CardFooter>
            <EnsureGameOwner game={game}>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button>
                        Game Completed
                    </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Finish game</AlertDialogTitle>
                            <AlertDialogDescription>Have everyone guessed the person</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>onFinishGameMutation({
                                gameId:game._id as Id<"games">
                            })}>Finish</AlertDialogAction>
                        </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
            </EnsureGameOwner>
        </CardFooter>
    </Card>
}

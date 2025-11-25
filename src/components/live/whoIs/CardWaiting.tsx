import EnsureGameOwner from "@/components/EnsureGameOwner";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameContext } from "@/lib/gameContext";
import { ToastError } from "@/lib/utils";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { WhoIsGame } from "convex/types";

type Props = {
    game:WhoIsGame
}

export default function CardWaiting({game}:Props) {
    const {mutate:onStartGuessMutation,isPending} = useMutation({
        mutationFn:useConvexMutation(api.live.whoIs.onStartGuess),
        onError:ToastError
    })

    const player = useGameContext().player
    if(!player){
        throw new Error("Missing player in game")
    }

    return <Card>
        <CardHeader>
            <CardTitle>Waiting</CardTitle>
            <CardDescription>Waiting for other players to enter their person</CardDescription>
        </CardHeader>
        <CardFooter>
            <EnsureGameOwner game={game}>
                <Pending isPending={isPending}>
                    <Button onClick={()=>onStartGuessMutation({gameId:game._id as Id<"games">})}>
                    Start Guessing
                    </Button>
                </Pending>
            </EnsureGameOwner>
        </CardFooter>
    </Card>
    
}

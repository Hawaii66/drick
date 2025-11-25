import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameContext } from "@/lib/gameContext"
import { ToastError } from "@/lib/utils";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { ReactionTimeGame } from "convex/types"
import { useEffect, useState } from "react";

type Props = {
    game: ReactionTimeGame
}

export default function CardReact({ game }: Props) {
    const [isInGame, setIsInGame] = useState(false)
    const [countDown, setCountDown] = useState(0);
    const [waitForGreen, setWaitForGreen] = useState(1);
    const [reactionTimeStart, setReactionTimeStart] = useState(0);

    const player = useGameContext().player

    const { mutate: onClickMutation, isPending } = useMutation({
        mutationFn: useConvexMutation(api.live.reactionTime.onReact),
        onError: ToastError
    })

    useEffect(() => {
        if(isInGame){
            return
        }
        setIsInGame(true)
        setCountDown(3000)

        const interval = setInterval(() => {
            setCountDown((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setWaitForGreen(game.data.delayUntilReactMs);

                    setTimeout(() => {
                        setWaitForGreen(0);
                        setReactionTimeStart(Date.now());
                    }, game.data.delayUntilReactMs);
                    return 0;
                }
                return prev - 100;
            })
        }, 100);

        return () => clearInterval(interval);
    }, [])

    if (!player) {
        throw new Error("No player in context");
    }

    return <Card>
        <CardHeader>
            <CardTitle>Klicka på Grönt</CardTitle>
            <CardDescription>När fyrkanten visar grönt, klicka så fort som möjligt!</CardDescription>
        </CardHeader>
        <CardContent>
            {isPending ? <p>Sparar resultat...</p> :
                <div onClick={() => onClickMutation({
                    player: player,
                    gameId: game._id as Id<"games">,
                    reactionTimeMs: reactionTimeStart > 0 ? Date.now() - reactionTimeStart : null,
                })} className="w-full aspect-square rounded-md" style={{
                    backgroundColor: countDown > 0 ? "#E2852E" : waitForGreen > 0 ? "#A72703" : "#63A361",
                }} >
                    {countDown > 0 &&
                        <div className="flex h-full w-full items-center justify-center text-6xl font-bold text-white select-none">
                            {Math.ceil(countDown / 1000)}
                        </div>
                    }
                </div>}
        </CardContent>
    </Card>


}

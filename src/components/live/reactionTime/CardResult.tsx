import EnsureGameOwner from "@/components/EnsureGameOwner";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameContext } from "@/lib/gameContext";
import { ToastError } from "@/lib/utils";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { ReactionTimeGame } from "convex/types"

type Props = {
    game: ReactionTimeGame
}

export default function CardResult({ game }: Props) {
    const player = useGameContext().player;
    if (!player) {
        throw new Error("No player in context");
    }

    const { mutate: onNextRound, isPending } = useMutation({
        mutationFn: useConvexMutation(api.live.reactionTime.onNextRound),
        onError: ToastError
    })

    const dnfs = game.players.filter(p => game.data.scores[p] === null);
    const scores = Object.entries(game.data.scores)
        .filter(([, score]) => score !== null)
        .map(([p, score]) => ([p, score as number] as const))
        .sort((a, b) => a[1] - b[1]);

    const hasAllPlayers = game.players.length === Object.keys(game.data.scores).length;

    return <Card>
        <CardHeader>
            <CardTitle>Runda {game.data.currentRound} Resultat</CardTitle>
            {dnfs.length >0 && <CardDescription>
                Tidiga klickare dricker mycket
            </CardDescription>}
            {game.players.length > 3 && <CardDescription>
                Top 3 spelare kan dela ut klunkar
            </CardDescription>}
            {game.players.length <= 3 && <CardDescription>
                Första plats kan dela ut klunkar
            </CardDescription>}
            {game.players.length > 6 && <CardDescription>
                Sista 3 spelare måste dricka
            </CardDescription>}
        </CardHeader>
        <CardContent>
            <h2>Tider:</h2>
            <ol>
                {scores.map(([p, score], index) => (
                    <li key={p}>
                        {index + 1}. {p}: {score} ms {index === 0 && "🏆"} {index === 1 && "🥈"} {index === 2 && "🥉"}
                    </li>
                ))}
            </ol>
            {dnfs.length > 0 && <>
                <h2 className="mt-8">Tidiga Klickare:</h2>
                <ul>
                    {dnfs.map(p => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            </>}
        </CardContent>
        <CardFooter>
            {hasAllPlayers && <EnsureGameOwner game={game}>
                <Pending isPending={isPending}>
                <Button onClick={() => onNextRound({
                    gameId: game._id as Id<"games">
                })}>
                    {game.data.currentRound < game.data.rounds ? "Nästa Runda" : "Avsluta Spel"}
                </Button>
            </Pending>
            </EnsureGameOwner>}

        </CardFooter>

    </Card>
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { useGameContext } from "@/lib/gameContext"
import { Game } from "convex/types"

type Props = {
    game: Game
}

export default function SelectPlayer({ game }: Props) {
    const gameContext = useGameContext()

    return <Card>
        <CardHeader>
            <CardTitle>Select Player</CardTitle>
            <CardDescription>You disconnected, select your player from the list to continue.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
            {game.players.map((player) => (
                <Button onClick={() => {
                    gameContext.setPlayer(player)
                }}>
                    {player}
                </Button>

            ))}
        </CardContent>
    </Card>

}

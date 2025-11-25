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
            <CardTitle>Välj Spelare</CardTitle>
            <CardDescription>Du kopplades ifrån, välj dig i listan nedan.</CardDescription>
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

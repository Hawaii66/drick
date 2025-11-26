import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImpostorGame } from "convex/types";

type Props = {
    game:ImpostorGame
}

export default function CardWaiting({game}:Props){
    return <Card>
        <CardHeader>
            <CardTitle>Väntar</CardTitle>
            <CardDescription>Väntar på att alla spelare ska ha svarat på frågan.</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Spelare som ännu inte svarat:</p>
            <ul>
                {game.players.filter(player => !(player in game.data.answers)).map((player) => (
                    <li key={player}>- {player}</li>
                ))}
            </ul>
        </CardContent>
    </Card>
}

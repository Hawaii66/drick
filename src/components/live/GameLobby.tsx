import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { Game } from "convex/types";
import EnsureGameOwner from "../EnsureGameOwner";
import { tryCatch } from "@/lib/utils";

type Props = {
    game: Game
}

export default function GameLobby({ game }: Props) {
    const startEnteringQuestionsMutation = useMutation(api.live.anonymous.startEnteringQuestions)

    return <Card>
        <CardHeader>
            <CardTitle>Game Lobby</CardTitle>
            <CardDescription>Waiting for players to join...</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                <InputOTP maxLength={6} value={game.pin} disabled>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <div>
                {game.players.map((player, index) => (
                    <p key={index}>{player}</p>
                ))}
            </div>
        </CardContent>
        <CardFooter>
            {game.players.length < 2 ? <p>Waiting for more players to join...</p> : <>
                <EnsureGameOwner game={game}>
                    <Button onClick={async() =>tryCatch(startEnteringQuestionsMutation({
                        gameId: game._id as Id<"games">,
                    }))}>
                        Start Game
                    </Button> 
                </EnsureGameOwner>

            </>}
        </CardFooter>
    </Card>;
}

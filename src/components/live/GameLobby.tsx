import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Button } from "../ui/button";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { Game } from "convex/types";
import EnsureGameOwner from "../EnsureGameOwner";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import Pending from "../Pending";

type Props = {
    game: Game
}

export default function GameLobby({ game }: Props) {
    const {mutate:startEnteringQuestionsMutation,isPending} = useMutation({
        mutationFn:useConvexMutation(api.live.anonymous.startEnteringQuestions),
        onError:ToastError
    })

    return <Card>
        <CardHeader>
            <CardTitle>Game Lobby</CardTitle>
            <CardDescription>Waiting for players to join...</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                <p className="font-semibold">Game PIN:</p>
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
                <p className="font-semibold mt-4">Players:</p>
                {game.players.map((player, index) => (
                    <p className="pl-2" key={index}>- {player}</p>
                ))}
            </div>
        </CardContent>
        <CardFooter>
            {game.players.length < 2 ? <p>Waiting for more players to join...</p> : <>
                <EnsureGameOwner game={game}>
                    <Pending isPending={isPending}>
                    <Button onClick={() =>startEnteringQuestionsMutation({
                        gameId: game._id as Id<"games">,
                    })}>
                        Start Game
                    </Button> 
                    </Pending>
                </EnsureGameOwner>

            </>}
        </CardFooter>
    </Card>;
}

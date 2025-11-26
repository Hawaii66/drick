import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { Game } from "convex/types";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import EnsureGameOwner from "@/components/EnsureGameOwner";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";

type Props = {
    game: Game
}

export default function CardGameLobby({ game }: Props) {
    const { mutate: startGameMutation, isPending } = useMutation({
        mutationFn: useConvexMutation(api.live.impostor.onStartGame),
        onError: ToastError
    })

    return <Card>
        <CardHeader>
            <CardTitle>Spel Lobby</CardTitle>
            <CardDescription>Väntar på fler spelare...</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                <p className="font-semibold">Spel PIN:</p>
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
                <p className="font-semibold mt-4">Spelare:</p>
                {game.players.map((player, index) => (
                    <p className="pl-2" key={index}>- {player}</p>
                ))}
            </div>
        </CardContent>
        <CardFooter>
            {game.players.length < 3 ? <p>Väntar på fler spelare...</p> : <>
                <EnsureGameOwner game={game}>
                    <Pending isPending={isPending}>
                        <Button onClick={() => startGameMutation({
                            gameId: game._id as Id<"games">,
                        })}>
                            Starta Spelet
                        </Button>
                    </Pending>
                </EnsureGameOwner>

            </>}
        </CardFooter>
    </Card>;
}

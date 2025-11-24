import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useGameContext } from "@/lib/gameContext";

export default function JoinGame() {
    const [name, setName] = useState("")
    const [pin, setPin] = useState("")
    const [error, setError] = useState<null | string>(null)

    const joinGameMutation = useMutation(api.live.game.joinGame)
    const router = useRouter()
    const gameContext = useGameContext()

    return <Card>
        <CardHeader>
            <CardTitle>Join Game</CardTitle>
            <CardDescription>
                Join an existing game to start playing with friends!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Label>Name:</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
            <Label>Game PIN:</Label>
            <InputOTP maxLength={6} value={pin} onChange={(val) => setPin(val)}>
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
            {error && <p className="text-red-500">{error}</p>}

        </CardContent>
        <CardFooter>
            <Button onClick={async () => {
                if(name.trim()=== ""||pin.trim().length!==6){
                    setError("Name and pin cannot be empty");
                    return;
                }
                setError(null);

                const game = await joinGameMutation({
                    player: name,
                    pin
                });
                gameContext.setPlayer(name)
                router.navigate({
                    to: "/live/anonymous/$id",
                    params: {
                        id: game.id
                    }
                })
            }}>Join Game</Button>

        </CardFooter>

    </Card>

}

import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { useGameContext } from "@/lib/gameContext";

export default function CreateGame() {
    const [name, setName] = useState("")
    const [error, setError] = useState<null | string>(null)

    const createGameMutation = useMutation(api.live.anonymous.createGame)
    const router = useRouter()
    const gameContext = useGameContext()

    return <Card>
        <CardHeader>
            <CardTitle>Create Game</CardTitle>
            <CardDescription>   Create a new game to start playing with friends!</CardDescription>
        </CardHeader>
        <CardContent>
            <Label>Name:</Label>
            <Input value={name} onChange={e => setName(e.target.value)} />
            {error && <p className="text-red-500">{error}</p>}
        </CardContent>
        <CardFooter>
            <Button onClick={async () => {
                if (name.trim() === "") {
                    setError("Name cannot be empty");
                    return;
                }
                setError(null);
                const id = await createGameMutation({ player: name });
                gameContext.setPlayer(name)
                router.navigate({
                    to:"/live/anonymous/$id",
                    params:{id}
                })
            }}>Create Game</Button>

        </CardFooter>

    </Card>

}

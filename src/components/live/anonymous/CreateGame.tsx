import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { useGameContext } from "@/lib/gameContext";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { GameSchema } from "convex/types";
import z from "zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export default function CreateGame() {
    const { register, formState, handleSubmit } = useForm<{ name: string }>({
        defaultValues: {
            name: ""
        },
        resolver: standardSchemaResolver(z.object({
            name: GameSchema.shape.players.element,
        }))
    })

    const { mutate: createGameMutation, isPending } = useMutation({
        mutationFn: useConvexMutation(api.live.anonymous.createGame),
        onError: ToastError,
    })
    const router = useRouter()
    const gameContext = useGameContext()

    return <Card>
        <CardHeader>
            <CardTitle>Skapa spel</CardTitle>
            <CardDescription>Skapa ett nytt spel med dina vänner!</CardDescription>
        </CardHeader>
        <CardContent>
            <Label>Ditt namn:</Label>
            <Input {...register("name")} />
            {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}
        </CardContent>
        <CardFooter>
            <Pending isPending={isPending}>
                <Button onClick={handleSubmit(async ({ name }) =>
                    createGameMutation({ player: name }, {
                        onSuccess: (id) => {
                            gameContext.setPlayer(name)
                            router.navigate({
                                to: "/live/anonymous/$id",
                                params: { id }
                            })
                        }
                    })
                )}>Skapa Spel</Button>
            </Pending>
        </CardFooter>
    </Card>

}

import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { useGameContext } from "@/lib/gameContext";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { GameSchema, ReactionTimeGameSchema } from "convex/types";
import z from "zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function CreateGame() {
    const { register, formState, handleSubmit, control } = useForm<{ name: string, rounds: number }>({
        defaultValues: {
            name: "",
            rounds: 2
        },
        resolver: standardSchemaResolver(z.object({
            name: GameSchema.shape.players.element,
            rounds: ReactionTimeGameSchema.shape.data.shape.rounds
        }))
    })

    const { mutate: createGameMutation, isPending } = useMutation({
        mutationFn: useConvexMutation(api.live.reactionTime.createGame),
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
            <FieldGroup>
                <Field>
                    <Label>Ditt namn:</Label>
                    <Input {...register("name")} />
                    {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}
                </Field>
                <Field>
                    <Label>Rundor</Label>
                    <Controller
                        control={control}
                        name="rounds"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Slider value={[value]} onValueChange={(e)=>onChange(e[0])} min={1} max={10} step={1} />
                                <p className="text-center">{value}</p>
                            </>
                        )}
                    />
                    <FieldDescription>Hur många rundor ska spelas</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Pending isPending={isPending}>
                <Button onClick={handleSubmit(async ({ name, rounds }) =>
                    createGameMutation({ player: name, rounds }, {
                        onSuccess: (id) => {
                            gameContext.setPlayer(name)
                            router.navigate({
                                to: "/live/reaction-time/$id",
                                params: { id }
                            })
                        }
                    }),console.log
                )}>Skapa Spel</Button>
            </Pending>
        </CardFooter>
    </Card>

}

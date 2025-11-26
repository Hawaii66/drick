import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { useGameContext } from "@/lib/gameContext";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { GameSchema, ImpostorGame, ImpostorGameSchema } from "convex/types";
import z from "zod";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function CreateGame() {
    const { register, formState, handleSubmit, control } = useForm<{ name: string, mode: string, rounds: number }>({
        defaultValues: {
            name: "",
            mode: "normal",
            rounds: 3
        },
        resolver: standardSchemaResolver(z.object({
            name: GameSchema.shape.players.element,
            mode: ImpostorGameSchema.shape.data.shape.mode,
            rounds: ImpostorGameSchema.shape.data.shape.rounds
        }))
    })

    const { mutate: createGameMutation, isPending } = useMutation({
        mutationFn: useConvexMutation(api.live.impostor.createGame),
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
                    <FieldLabel>Typ av frågor</FieldLabel>
                    <Controller
                        name="mode"
                        control={control}
                        render={({ field: { onChange, value: mode } }) => (
                            <Select value={mode} onValueChange={(value) => onChange(value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {["normal", "spicy"].map((modeOption) => (
                                        <SelectItem key={modeOption} value={modeOption}>
                                            {modeOption.charAt(0).toUpperCase() + modeOption.slice(1)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <FieldDescription>Välj vilken typ av frågor som ska visas</FieldDescription>
                </Field>
                <Field>
                    <FieldLabel>Rundor</FieldLabel>
                    <Controller
                        name="rounds"
                        control={control}
                        render={({ field: { onChange, value: challengesPerPlayer } }) => (
                            <>
                                <Slider value={[challengesPerPlayer]} onValueChange={(e) => onChange(e[0])} min={1} max={5} step={1} />
                                <p className="text-center">{challengesPerPlayer}</p>
                            </>
                        )}
                    />
                    <FieldDescription>Välj antalet rundor som ska spelas</FieldDescription>
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Pending isPending={isPending}>
                <Button onClick={handleSubmit(async ({ name, mode, rounds }) =>
                    createGameMutation({ player: name, mode: mode as ImpostorGame["data"]["mode"], rounds }, {
                        onSuccess: (id) => {
                            gameContext.setPlayer(name)
                            router.navigate({
                                to: "/live/impostor/$id",
                                params: { id }
                            })
                        }
                    }), console.log
                )}>Skapa Spel</Button>
            </Pending>
        </CardFooter>
    </Card>

}

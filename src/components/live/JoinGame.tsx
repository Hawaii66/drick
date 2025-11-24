import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useGameContext } from "@/lib/gameContext";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import { GameSchema } from "convex/types";
import { FieldError } from "../ui/field";
import { tryCatch } from "@/lib/utils";

export default function JoinGame() {
    const { register, formState, handleSubmit, control } = useForm<{ name: string, pin: string }>({
        defaultValues: {
            name: "",
            pin: ""
        },
        resolver: standardSchemaResolver(z.object({
            name: GameSchema.shape.players.element,
            pin: GameSchema.shape.pin
        }))
    })

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
            <Input {...register("name")} />
            {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}
            <Label>Game PIN:</Label>
            <Controller control={control} name="pin" render={({ field: { onChange, value } }) =>
                <InputOTP maxLength={6} value={value} onChange={onChange}>
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
                </InputOTP>}
            />
            {formState.errors.pin && <FieldError>{formState.errors.pin.message}</FieldError>}
        </CardContent>
        <CardFooter>
            <Button onClick={handleSubmit(async ({ name, pin }) => {
                const { data: game, error } = await tryCatch(joinGameMutation({
                    player: name,
                    pin
                }));
                if (error !== undefined) {
                    return
                }

                gameContext.setPlayer(name)
                router.navigate({
                    to: "/live/anonymous/$id",
                    params: {
                        id: game.id
                    }
                })
            })}>Join Game</Button>
        </CardFooter>
    </Card>

}

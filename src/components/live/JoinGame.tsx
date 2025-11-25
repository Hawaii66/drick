import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useGameContext } from "@/lib/gameContext";
import { Controller, useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import z from "zod";
import { GameSchema } from "convex/types";
import { FieldError } from "../ui/field";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Pending from "../Pending";

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

    const {mutate:joinGameMutation,isPending} = useMutation({
        mutationFn: useConvexMutation(api.live.game.joinGame),
        onError: ToastError
    })
    const router = useRouter()
    const gameContext = useGameContext()

    return <Card>
        <CardHeader>
            <CardTitle>Gå med i spel</CardTitle>
            <CardDescription>
                Gå med i ett befintligt spel för att börja spela med vänner!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Label>Namn:</Label>
            <Input {...register("name")} />
            {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}
            <Label>Spel PIN:</Label>
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
            <Pending isPending={isPending} >
            <Button onClick={handleSubmit(({ name, pin }) =>joinGameMutation({
                player: name,
                pin
            },{
                onSuccess: async({id})=>{
                        gameContext.setPlayer(name)
                        router.navigate({
                            to: "/live/anonymous/$id",
                            params: {
                                id
                            }
                        })
                }}))}
            >Gå med</Button>
                </Pending>
        </CardFooter>
    </Card>

}

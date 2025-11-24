import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { useGameContext } from "@/lib/gameContext";
import { tryCatch } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { GameSchema } from "convex/types";
import z from "zod";
import { FieldError } from "../ui/field";

export default function CreateGame() {
    const { register, formState, handleSubmit } = useForm<{name:string}>({
        defaultValues:{
            name:""
        },
        resolver: standardSchemaResolver(z.object({
            name:GameSchema.shape.players.element,
        }))
    })

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
            <Input {...register("name")} />
            {formState.errors.name && <FieldError>{formState.errors.name.message}</FieldError>}
        </CardContent>
        <CardFooter>
            <Button onClick={handleSubmit(async ({name}) => {
                const {data:id,error} = await tryCatch(createGameMutation({ player: name }));
                if(error !== undefined){
                    return
                }

                gameContext.setPlayer(name)
                router.navigate({
                    to:"/live/anonymous/$id",
                    params:{id}
                })
            })}>Create Game</Button>
        </CardFooter>
    </Card>

}

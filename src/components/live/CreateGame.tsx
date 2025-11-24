import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { api } from "convex/_generated/api";
import { useRouter } from "@tanstack/react-router";
import { useGameContext } from "@/lib/gameContext";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { GameSchema } from "convex/types";
import z from "zod";
import { FieldError } from "../ui/field";
import { useConvexMutation } from "@convex-dev/react-query";
import { ToastError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Pending from "../Pending";

export default function CreateGame() {
    const { register, formState, handleSubmit } = useForm<{name:string}>({
        defaultValues:{
            name:""
        },
        resolver: standardSchemaResolver(z.object({
            name:GameSchema.shape.players.element,
        }))
    })

    const {mutate:createGameMutation,isPending} = useMutation({
            mutationFn:useConvexMutation( api.live.anonymous.createGame),
            onError:ToastError,
    })
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
            <Pending isPending={isPending}>
            <Button onClick={handleSubmit(async ({name}) => 
                    createGameMutation({ player: name },{
                        onSuccess:(id)=>{
                            gameContext.setPlayer(name)
                            router.navigate({
                                to:"/live/anonymous/$id",
                                params:{id}
                            })
                        }
                    })
            )}>Create Game</Button>
            </Pending>
        </CardFooter>
    </Card>

}

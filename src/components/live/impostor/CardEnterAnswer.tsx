import Pending from "@/components/Pending"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGameContext } from "@/lib/gameContext"
import { ToastError } from "@/lib/utils"
import { useConvexMutation } from "@convex-dev/react-query"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { useMutation } from "@tanstack/react-query"
import { api } from "convex/_generated/api"
import { Id } from "convex/_generated/dataModel"
import { ImpostorGame, ImpostorGameSchema } from "convex/types"
import { useForm } from "react-hook-form"
import z from "zod"

type Props = {
    game:ImpostorGame
}

export default function CardEnterAnswer({game}:Props){
    const { register, formState, handleSubmit} = useForm<{answer:string}>({
        defaultValues:{
            answer:""
        },
        resolver:standardSchemaResolver(z.object({
            answer:ImpostorGameSchema.shape.data.shape.answers.valueType,
        }))
    })

    const { mutate:submitAnswerMutation ,isPending } = useMutation({
        mutationFn:useConvexMutation(api.live.impostor.onAnswer),
        onError:ToastError
    })

    const player = useGameContext().player
    if(!player){
        throw new Error("Missing game player")
    }

    const isImpostor = game.data.impostor === player
    const question = game.data.question[isImpostor ? "impostor" : "normal"]

    return <Card>
        <CardHeader>
            <CardTitle>Svara på frågan</CardTitle>
            <CardDescription>Vad är ditt svar på frågan?</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="my-4">Fråga: <i>{question}</i></p>
            <FieldGroup>
                <Field>
                    <Label>Ditt Svar</Label>
                    <Input {...register("answer")} />
                    {formState.errors.answer && <FieldError>{formState.errors.answer.message}</FieldError>}
                </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter>
            <Pending isPending={isPending}>
                <Button onClick={handleSubmit(async ({answer})=>
                    submitAnswerMutation({
                        gameId:game._id as Id<"games">,
                        answer,
                        player
                    })
                )} className="btn btn-primary">
                    Skicka Svar
                </Button>
            </Pending>
        </CardFooter>
    </Card>
}

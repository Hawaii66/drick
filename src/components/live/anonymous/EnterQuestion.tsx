import EnsureGameOwner from "@/components/EnsureGameOwner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToastError } from "@/lib/utils";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { AnonymouseGame, AnonymousQuestionSchema } from "convex/types";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query"
import { useConvexMutation } from "@convex-dev/react-query";
import Pending from "@/components/Pending";

type Props = {
    game: AnonymouseGame
}

export default function EnterQuestion({ game }: Props) {
    const { register, handleSubmit, formState, control } = useForm<{ question: string, targetPlayer: string }>({
        defaultValues: {
            question: "",
            targetPlayer: ""
        },
        resolver: standardSchemaResolver(AnonymousQuestionSchema)
    })

    const {mutate:enterQuestionMutation, isPending:isPendingEnterQuestion }= useMutation({
        mutationFn:useConvexMutation(api.live.anonymous.addQuestion),
        onError:ToastError
    })
    const {mutate:startAnsweringQuestionsMutation, isPending:isPendingStartAnswering}= useMutation({
        mutationFn:useConvexMutation(api.live.anonymous.startAnsweringQuestions),
        onError:ToastError
    })

    return <Card>
        <CardHeader>
            <CardTitle>Skriv frågor</CardTitle>
            <CardDescription>
                Skriv roliga frågor att ställa till spelarna.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
                <Field>
                <FieldLabel>Spelare:</FieldLabel>
                <Controller control={control} name="targetPlayer" render={({ field: { onChange, value } }) =>
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Generella</SelectLabel>
                                <SelectItem value="Alla">Alla</SelectItem>
                                <SelectItem value="Killar">Killar</SelectItem>
                                <SelectItem value="Tjejer">Tjejer</SelectItem>
                            </SelectGroup>
                            <SelectGroup >
                                <SelectLabel>Spelare</SelectLabel>
                                {game.players.map((p) => (
                                    <SelectItem key={p} value={p}>
                                        {p}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>} />
                {formState.errors.targetPlayer && <FieldError>{formState.errors.targetPlayer.message}</FieldError>}
                </Field>
                <Field>
                <FieldLabel>Fråga:</FieldLabel>
                <Input {...register("question")} />
                {formState.errors.question && <FieldError>{formState.errors.question.message}</FieldError>}
            </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-8 items-start">
            <p>Antal inskickade frågor: {game.data.questions.length}</p>
            <Pending isPending={isPendingEnterQuestion}>
            <Button onClick={handleSubmit(async ({ question, targetPlayer }) => {
                enterQuestionMutation({
                    gameId: game._id as Id<"games">,
                    question,
                    targetPlayer
                })
           })}>
                Skicka in fråga
            </Button>
            </Pending>
            <Pending isPending={isPendingStartAnswering}>
            <EnsureGameOwner game={game}>
                <Button onClick={() =>
                    startAnsweringQuestionsMutation({
                        gameId: game._id as Id<"games">,
                    })
                }>
                    Starta Spelet
                </Button>
            </EnsureGameOwner>
            </Pending>
        </CardFooter>
    </Card>

}

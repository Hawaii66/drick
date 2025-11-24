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
            <CardTitle>Enter Question</CardTitle>
            <CardDescription>
                Please enter your question and the target player.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <FieldGroup>
                <Field>
                <FieldLabel>Target Player:</FieldLabel>
                <Controller control={control} name="targetPlayer" render={({ field: { onChange, value } }) =>
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>General</SelectLabel>
                                <SelectItem value="Everyone">Everyone</SelectItem>
                                <SelectItem value="Boys">Boys</SelectItem>
                                <SelectItem value="Girls">Girls</SelectItem>
                            </SelectGroup>
                            <SelectGroup >
                                <SelectLabel>Players</SelectLabel>
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
                <FieldLabel>Question:</FieldLabel>
                <Input {...register("question")} />
                {formState.errors.question && <FieldError>{formState.errors.question.message}</FieldError>}
            </Field>
            </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-8 items-start">
            <p>Total questions submitted: {game.data.questions.length}</p>
            <Pending isPending={isPendingEnterQuestion}>
            <Button onClick={handleSubmit(async ({ question, targetPlayer }) => {
                enterQuestionMutation({
                    gameId: game._id as Id<"games">,
                    question,
                    targetPlayer
                })
           })}>
                Submit Question
            </Button>
            </Pending>
            <Pending isPending={isPendingStartAnswering}>
            <EnsureGameOwner game={game}>
                <Button onClick={() =>
                    startAnsweringQuestionsMutation({
                        gameId: game._id as Id<"games">,
                    })
                }>
                    Start Game
                </Button>
            </EnsureGameOwner>
            </Pending>
        </CardFooter>
    </Card>

}

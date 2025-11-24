import EnsureGameOwner from "@/components/EnsureGameOwner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tryCatch } from "@/lib/utils";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { AnonymouseGame, AnonymousQuestionSchema } from "convex/types";
import { Controller, useForm } from "react-hook-form";

type Props = {
    game: AnonymouseGame
}

export default function EnterQuestion({ game }: Props) {
    const { register, handleSubmit, formState, control, setValue } = useForm<{ question: string, targetPlayer: string }>({
        defaultValues: {
            question: "",
            targetPlayer: ""
        },
        resolver: standardSchemaResolver(AnonymousQuestionSchema)
    })

    const enterQuestionMutation = useMutation(api.live.anonymous.addQuestion)
    const startAnsweringQuestionsMutation = useMutation(api.live.anonymous.startAnsweringQuestions)

    console.log(formState)

    return <Card>
        <CardHeader>
            <CardTitle>Enter Question</CardTitle>
            <CardDescription>
                Please enter your question and the target player.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <FieldSet>
                <FieldLabel>Target Player:</FieldLabel>
                <Controller control={control} name="targetPlayer" render={({ field: { onChange, value } }) =>
                    <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
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
                <FieldLabel>Question:</FieldLabel>
                <Input {...register("question")} />
                {formState.errors.question && <FieldError>{formState.errors.question.message}</FieldError>}
            </FieldSet>
        </CardContent>
        <CardFooter className="flex flex-col gap-8 items-start">
            <p>Total questions submitted: {game.data.questions.length}</p>
            <Button onClick={handleSubmit(async ({ question, targetPlayer }) => {
                await tryCatch(enterQuestionMutation({
                    gameId: game._id as Id<"games">,
                    question,
                    targetPlayer
                }));
                setValue("targetPlayer","")
                setValue("question","")
            },console.error)}>
                Submit Question
            </Button>
            <EnsureGameOwner game={game}>
                <Button onClick={() =>
                    tryCatch(startAnsweringQuestionsMutation({
                        gameId: game._id as Id<"games">,
                    }))
                }>
                    Start Game
                </Button>
            </EnsureGameOwner>
        </CardFooter>
    </Card>

}

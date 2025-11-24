import EnsureGameOwner from "@/components/EnsureGameOwner";
import Pending from "@/components/Pending";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ToastError } from "@/lib/utils";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { AnonymouseGame } from "convex/types";

type Props = {
    game: AnonymouseGame
}

export default function AnswerQuestions({ game }: Props) {
    const question = game.data.questions[game.data.questionIndex ?? 0];

    const {mutate:nextQuestionMutation,isPending} = useMutation({
        mutationFn:useConvexMutation(api.live.anonymous.onNextQuestion),
        onError:ToastError
    })

    return <Card>
        <CardHeader>
            <CardTitle>Answer Questions</CardTitle>
            <CardDescription>Answer the questions submitted by players.</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                <p className="font-semibold">Questions</p>
                <p>Total questions to answer: {game.data.questions.length}</p>
                <p>Current question: {(game.data.questionIndex ?? 0) + 1}</p>
            </div>

            <div className="py-4 px-2 text-center flex flex-col mt-16 gap-2 items-center rounded-base justify-center border-border border-2 bg-secondary-background ">
                <p className="font-bold text-xl">{question.targetPlayer}</p>
                <p className="font-bold text-xl">{question?.question}</p>
            </div>
        </CardContent>
        <CardFooter className="justify-center mt-8">
            <EnsureGameOwner game={game}>
                <Pending isPending={isPending} >
                <Button onClick={() =>
                    nextQuestionMutation({ gameId: game._id as Id<"games"> })
                }>
                        {game.data.questionIndex === game.data.questions.length- 1?"Finish Game":"Next Question"}
                </Button>
                </Pending>
            </EnsureGameOwner>
        </CardFooter>
    </Card>
}

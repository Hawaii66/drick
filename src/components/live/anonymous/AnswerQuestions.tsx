import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useGameContext } from "@/lib/gameContext";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { AnonymouseGame } from "convex/live/anonymous"
import { useMutation } from "convex/react";

type Props = {
    game: AnonymouseGame
}

export default function AnswerQuestions({ game }: Props) {
    const question = game.data.questions[game.data.questionIndex ?? 0];

    const nextQuestionMutation = useMutation(api.live.anonymous.onNextQuestion)
    const player = useGameContext().player

    return <Card>
        <CardHeader>
            <CardTitle>Answer Questions</CardTitle>
            <CardDescription>Please answer the questions submitted by players.</CardDescription>
        </CardHeader>
        <CardContent>
            <div>
                <p>Total questions to answer: {game.data.questions.length}</p>
                <p>Current question: {(game.data.questionIndex ?? 0) + 1}</p>
            </div>

            <div>
                <p>Question for: {question?.targetPlayer}</p>
                <p>{question?.question}</p>
            </div>
        </CardContent>
        <CardFooter>
            {player === game.owner && <Button onClick={() => {
                nextQuestionMutation({ gameId: game._id as Id<"games"> });
            }}>
                Next Question
            </Button>}
        </CardFooter>
    </Card>
}

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGameContext } from "@/lib/gameContext";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { AnonymouseGame } from "convex/live/anonymous";
import { useMutation } from "convex/react";
import { useState } from "react";

type Props = {
    game: AnonymouseGame
}

export default function EnterQuestion({ game }: Props) {
    const [question, setQuestion] = useState("");
    const [target, setTarget] = useState("");
    const [error,setError] = useState<null|string>(null)

    const enterQuestionMutation = useMutation(api.live.anonymous.addQuestion)
    const startAnsweringQuestionsMutation = useMutation(api.live.anonymous.startAnsweringQuestions)
    const player = useGameContext().player

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
                <Select value={target} onValueChange={(value) => setTarget(value)}>
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
                </Select>
                <FieldLabel>Question:</FieldLabel>
                <Input value={question} onChange={(e) => setQuestion(e.target.value)} />
                {error&&<FieldError>{error}</FieldError>}
            </FieldSet>
        </CardContent>
        <CardFooter className="flex flex-col gap-8 items-start">
            <p>Total questions submitted: {game.data.questions.length}</p>
            <Button onClick={async () => {
                if(question.trim().length===0 || target.trim().length===0){
                    setError("Please enter a question and select a target player.");
                    return;
                }
                setError(null);

                await enterQuestionMutation({
                    gameId: game._id as Id<"games">,
                    question,
                    targetPlayer: target
                });
                setQuestion("");
                setTarget("");
            }}>
                Submit Question
            </Button>
            {player === game.owner && <Button onClick={async () => {
                await startAnsweringQuestionsMutation({
                    gameId: game._id as Id<"games">,
                });
            }}>
                Start Game
            </Button>}
        </CardFooter>
    </Card>

}

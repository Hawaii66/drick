import { STCEvent } from "@/lib/event";
import { useExposedGame } from "@/lib/exposed";
import { useSocketLatestEvent } from "@/lib/socket";
import PageAnswerQuestions from "@/pages/PageAnswerQuestions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exposed/active/$pin/answer")({
  component: RouteComponent,
});

function RouteComponent() {
  const answerQuestions = useSocketLatestEvent<{ questions: string[] } | null>(
    STCEvent.EXPOSED.ANSWER_QUESTIONS
  );
  const { players } = useExposedGame();

  if (!answerQuestions) {
    return <p>Loading questions...</p>;
  }

  return (
    <PageAnswerQuestions
      players={players}
      questions={answerQuestions?.questions}
    />
  );
}

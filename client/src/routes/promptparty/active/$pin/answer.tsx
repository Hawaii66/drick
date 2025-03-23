import { STCEvent } from "@/common/event";
import { usePromptPartyGame } from "@/lib/promptparty";
import { useSocketLatestEvent } from "@/lib/socket";
import PageAnswerQuestions from "@/pages/promptParty/PageAnswerQuestions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promptparty/active/$pin/answer")({
  component: RouteComponent,
});

function RouteComponent() {
  const answerQuestions = useSocketLatestEvent<{ questions: string[] } | null>(
    STCEvent.PROMPT_PARTY.ANSWER_QUESTIONS,
  );
  const { players } = usePromptPartyGame();

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

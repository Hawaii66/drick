import { STCEvent } from "@/common/event";
import { usePromptPartyGame } from "@/lib/promptparty";
import { useSocketEvent, useSocketLatestEvent } from "@/lib/socket";
import PageShowQuestion from "@/pages/PageShowQuestion";
import { SmallGame } from "@/types/game";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/promptparty/active/$pin/show")({
  component: RouteComponent,
});

function RouteComponent() {
  const question = useSocketLatestEvent<{
    question: SmallGame;
    currentQuestion: number;
    totalQuestions: number;
  }>(STCEvent.PROMPT_PARTY.SHOW_QUESTION);

  const { players } = usePromptPartyGame();
  const navigate = useNavigate();

  const onFinished = useSocketEvent<object | null>(
    STCEvent.PROMPT_PARTY.FINISHED,
    null,
  );
  useEffect(() => {
    if (!onFinished) return;

    navigate({
      to: "/promptparty/active/$pin/finished",
      from: "/promptparty/active/$pin/show",
    });
  }, [onFinished, navigate]);

  if (!question) {
    return <p>Loading question</p>;
  }

  return (
    <PageShowQuestion
      currentQuestion={question.currentQuestion}
      totalQuestions={question.totalQuestions}
      players={players}
      question={question?.question}
    />
  );
}

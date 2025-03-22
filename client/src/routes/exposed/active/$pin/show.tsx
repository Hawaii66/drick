import { STCEvent } from "@/common/event";
import { useExposedGame } from "@/lib/exposed";
import { useSocketEvent, useSocketLatestEvent } from "@/lib/socket";
import PageShowQuestion from "@/pages/PageShowQuestion";
import { SmallGame } from "@/types/game";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/exposed/active/$pin/show")({
  component: RouteComponent,
});

function RouteComponent() {
  const question = useSocketLatestEvent<{
    question: SmallGame;
    currentQuestion: number;
    totalQuestions: number;
  }>(STCEvent.EXPOSED.SHOW_QUESTION);

  const { players } = useExposedGame();
  const navigate = useNavigate();

  const onFinished = useSocketEvent<object | null>(
    STCEvent.EXPOSED.FINISHED,
    null
  );
  useEffect(() => {
    if (!onFinished) return;

    navigate({
      to: "/exposed/active/$pin/finished",
      from: "/exposed/active/$pin/show",
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

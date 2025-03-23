import { STCEvent, CTSEvent } from "@/common/event";
import GroupChallenge from "@/components/question/GroupChallenge";
import GroupQuestion from "@/components/question/GroupQuestion";
import PlayerChallenge from "@/components/question/PlayerChallenge";
import PlayerQuestion from "@/components/question/PlayerQuestion";
import TwoTruthsOneLie from "@/components/question/TwoTruthsOneLie";
import WriteSomething from "@/components/question/WriteSomething";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSocket, useSocketData, useSocketEvent } from "@/lib/socket";
import { SmallGame } from "@/types/game";
import { LobbyPlayer } from "@/types/player";
import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect } from "react";

type Props = {
  question: SmallGame;
  players: LobbyPlayer[];
  totalQuestions: number;
  currentQuestion: number;
};

export default function PageShowQuestion({
  question,
  players,
  currentQuestion,
  totalQuestions,
}: Props) {
  const { id } = useSocketData();
  const isHost = players.some((i) => i.isHost && i.id === id);

  const socket = useSocket();
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

  const idToPlayer = useCallback(
    (id: string) => {
      return players.find((i) => i.id === id)!;
    },
    [players],
  );

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg.svg)] px-8 w-screen h-screen">
      {question.type === "group-question" && (
        <GroupQuestion question={question.question} />
      )}
      {question.type === "group-challenge" && (
        <GroupChallenge challenge={question.challenge} />
      )}
      {question.type === "player-question" && (
        <PlayerQuestion
          player={idToPlayer(question.player)}
          question={question.question}
        />
      )}
      {question.type === "player-challenge" && (
        <PlayerChallenge
          player={idToPlayer(question.player)}
          challenge={question.challenge}
        />
      )}
      {question.type === "2-truths-1-lie" && (
        <TwoTruthsOneLie
          player={idToPlayer(question.player)}
          lie={question.lie}
          truths={question.truths}
        />
      )}
      {question.type === "write-something" && (
        <WriteSomething text={question.text} />
      )}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Questions Completed</CardTitle>
          <CardDescription>
            Showing question {currentQuestion} / {totalQuestions}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={(currentQuestion / totalQuestions) * 100} />
        </CardContent>
      </Card>
      {isHost && (
        <Card>
          <CardFooter>
            <Button
              onClick={() =>
                socket.emit(CTSEvent.PROMPT_PARTY.NEXT_QUESTION, {})
              }
            >
              Next Question
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

import { CTSEvent } from "@/common/event";
import GroupChallenge from "@/components/answer/GroupChallenge";
import GroupQuestion from "@/components/answer/GroupQuestion";
import PlayerChallenge from "@/components/answer/PlayerChallenge";
import PlayerQuestion from "@/components/answer/PlayerQuestion";
import TwoTruthsOneLie from "@/components/answer/TwoTruthsOneLie";
import WriteSomething from "@/components/answer/WriteSomething";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSocket, useSocketData } from "@/lib/socket";
import { SmallGame } from "@/types/game";
import { LobbyPlayer } from "@/types/player";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type Props = {
  players: LobbyPlayer[];
  questions: string[];
};

export default function PageAnswerQuestions({ players, questions }: Props) {
  const [data, setData] = useState<{
    [key in string]: { [key in string]: string };
  }>({});

  const updateData = (type: SmallGame["type"], key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] ?? {}),
        [key]: value,
      },
    }));
  };

  const getData = (type: SmallGame["type"], key: string) => {
    const obj = data[type];
    if (!obj) return "";

    return obj[key] ?? "";
  };

  const socket = useSocket();
  const { id } = useSocketData();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-8 bg-[url(/bg.svg)] px-8 w-screen h-screen">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Answer Questions</CardTitle>
          <CardDescription>
            Answer the questions below anonymously. No one will now who wrote
            the questions
          </CardDescription>
          <CardDescription>
            Click on a title below to expand the fields that needs to be
            answered
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardContent>
          <Accordion type="single">
            {questions.map((i) => {
              switch (i) {
                case "group-challenge":
                  return (
                    <GroupChallenge
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                    />
                  );

                case "group-question":
                  return (
                    <GroupQuestion
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                    />
                  );
                case "player-challenge":
                  return (
                    <PlayerChallenge
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                      players={players}
                    />
                  );
                case "player-question":
                  return (
                    <PlayerQuestion
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                      players={players}
                    />
                  );
                case "2-truths-1-lie":
                  return (
                    <TwoTruthsOneLie
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                    />
                  );
                case "write-something":
                  return (
                    <WriteSomething
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                    />
                  );
                default: {
                  throw new Error("Invalid question type: " + i);
                }
              }
            })}
          </Accordion>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Button
            onClick={() => {
              const toSend = {
                answers: Object.keys(data).map((key) => {
                  if (key === "2-truths-1-lie") {
                    return {
                      type: "2-truths-1-lie",
                      lie: data["2-truths-1-lie"]["lie"],
                      truths: [
                        data["2-truths-1-lie"]["truth-1"],
                        data["2-truths-1-lie"]["truth-2"],
                      ],
                      player: id,
                    };
                  }
                  return {
                    type: key,
                    ...data[key],
                  };
                }),
              };
              socket.emit(CTSEvent.PROMPT_PARTY.ANSWERED_QUESTIONS, toSend);
              navigate({
                to: "/promptparty/active/$pin/has-answered",
                from: "/promptparty/active/$pin/answer",
              });
            }}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

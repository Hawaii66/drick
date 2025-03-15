import GroupChallenge from "@/components/answer/GroupChallenge";
import GroupQuestion from "@/components/answer/GroupQuestion";
import PersonChallenge from "@/components/answer/PersonChallenge";
import PersonQuestion from "@/components/answer/PersonQuestion";
import TwoTruthsOneLie from "@/components/answer/TwoTruthsOneLie";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NeedsAnswers, Player, SmallGame } from "@/types/game";
import { useRef, useState } from "react";

const players: Player[] = [
  {
    id: "123",
    name: "123",
  },
  {
    id: "123123",
    name: "123123",
  },
  {
    id: "abs",
    name: "qdasd",
  },
];

const temp = NeedsAnswers.sort(() => Math.random() - 0.5);

const useQuestions = () => {
  const questions = useRef(temp).current;

  return {
    questions,
  };
};

export default function PageAnswerQuestions() {
  const { questions } = useQuestions();
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
          <Accordion type="multiple">
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
                case "person-challenge":
                  return (
                    <PersonChallenge
                      key={i}
                      getAnswer={getData}
                      updateAnswer={updateData}
                      players={players}
                    />
                  );
                case "person-question":
                  return (
                    <PersonQuestion
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
              }
            })}
          </Accordion>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Button>Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}

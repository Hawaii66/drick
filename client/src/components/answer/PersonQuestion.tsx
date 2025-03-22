import { Player } from "@/types/game";
import Answer from "./components/Answer";
import AnswerTextAreaInput from "./components/TextAreaInput";
import { GetAnswer, UpdateAnswer } from "./components/type";
import AnswerSelectInput from "./components/SelectInput";
import { Help } from "./components/Help";

type Props = {
  updateAnswer: UpdateAnswer;
  getAnswer: GetAnswer;
  players: Player[];
};

export default function PersonQuestion({
  updateAnswer,
  getAnswer,
  players,
}: Props) {
  return (
    <Answer question="person-question">
      <p>Write a question for one person</p>
      <AnswerSelectInput
        label="Person"
        onChange={(val) => updateAnswer("person-question", "person", val)}
        selectable={players.map((player) => ({
          id: player.id,
          label: player.name,
        }))}
        selected={getAnswer("person-question", "person")}
      />
      <AnswerTextAreaInput
        label="Question"
        lines={3}
        onChange={(val) => updateAnswer("person-question", "question", val)}
        value={getAnswer("person-question", "question")}
        help={Help.PersonQuestion}
      />
    </Answer>
  );
}

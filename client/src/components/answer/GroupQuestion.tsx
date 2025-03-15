import Answer from "./components/Answer";
import { Help } from "./components/Help";
import AnswerTextAreaInput from "./components/TextAreaInput";
import { GetAnswer, UpdateAnswer } from "./components/type";

type Props = {
  updateAnswer: UpdateAnswer;
  getAnswer: GetAnswer;
};

export default function GroupQuestion({ updateAnswer, getAnswer }: Props) {
  return (
    <Answer question="group-question">
      <AnswerTextAreaInput
        label="Question"
        lines={3}
        onChange={(val) => updateAnswer("group-question", "question", val)}
        value={getAnswer("group-question", "question")}
        help={Help.GroupQuestions}
      />
    </Answer>
  );
}

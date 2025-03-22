import Answer from "./components/Answer";
import AnswerTextAreaInput from "./components/TextAreaInput";
import { GetAnswer, UpdateAnswer } from "./components/type";

type Props = {
  updateAnswer: UpdateAnswer;
  getAnswer: GetAnswer;
};

export default function WriteSomething({ getAnswer, updateAnswer }: Props) {
  return (
    <Answer question="write-something">
      <p>Write something, anything that you want to share</p>
      <AnswerTextAreaInput
        label="Write something"
        lines={3}
        onChange={(value) => updateAnswer("write-something", "text", value)}
        value={getAnswer("write-something", "text")}
      />
    </Answer>
  );
}

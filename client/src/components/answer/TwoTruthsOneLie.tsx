import Answer from "./components/Answer";
import { Help } from "./components/Help";
import AnswerTextAreaInput from "./components/TextAreaInput";
import { GetAnswer, UpdateAnswer } from "./components/type";

type Props = {
  updateAnswer: UpdateAnswer;
  getAnswer: GetAnswer;
};

export default function TwoTruthsOneLie({ getAnswer, updateAnswer }: Props) {
  return (
    <Answer question="2-truths-1-lie">
      <p>
        Write 2 truths and 1 lie about yourself, the other in the group will
        guess which is the lie
      </p>
      <p>This question is not anonymous. People will see your name</p>
      <AnswerTextAreaInput
        label="Truth"
        lines={3}
        onChange={(value) => updateAnswer("2-truths-1-lie", "truth-1", value)}
        value={getAnswer("2-truths-1-lie", "truth-1")}
        help={Help.TruthStatements}
      />
      <AnswerTextAreaInput
        label="Truth"
        lines={3}
        onChange={(value) => updateAnswer("2-truths-1-lie", "truth-2", value)}
        value={getAnswer("2-truths-1-lie", "truth-2")}
        help={Help.TruthStatements}
      />
      <AnswerTextAreaInput
        label="Lie"
        lines={3}
        onChange={(value) => updateAnswer("2-truths-1-lie", "lie", value)}
        value={getAnswer("2-truths-1-lie", "lie")}
        help={Help.LieStatements}
      />
    </Answer>
  );
}

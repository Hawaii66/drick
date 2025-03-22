import Answer from "./components/Answer";
import { Help } from "./components/Help";
import AnswerTextAreaInput from "./components/TextAreaInput";
import { GetAnswer, UpdateAnswer } from "./components/type";

type Props = {
  updateAnswer: UpdateAnswer;
  getAnswer: GetAnswer;
};

export default function GroupChallenge({ updateAnswer, getAnswer }: Props) {
  return (
    <Answer question="group-challenge">
      <p>Write a challenge that the whole group will have to do</p>
      <AnswerTextAreaInput
        label="Challenge"
        lines={3}
        onChange={(val) => updateAnswer("group-challenge", "challenge", val)}
        value={getAnswer("group-challenge", "challenge")}
        help={Help.GroupChallenges}
      />
    </Answer>
  );
}

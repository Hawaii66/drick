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

export default function PersonChallenge({
  updateAnswer,
  getAnswer,
  players,
}: Props) {
  return (
    <Answer question="person-challenge">
      <p>Write a challenge for one person</p>
      <AnswerSelectInput
        label="Person"
        onChange={(val) => updateAnswer("person-challenge", "person", val)}
        selectable={players.map((player) => ({
          id: player.id,
          label: player.name,
        }))}
        selected={getAnswer("person-challenge", "person")}
      />
      <AnswerTextAreaInput
        label="Challenge"
        lines={3}
        onChange={(val) => updateAnswer("person-challenge", "challenge", val)}
        value={getAnswer("person-challenge", "challenge")}
        help={Help.PersonChallenges}
      />
    </Answer>
  );
}

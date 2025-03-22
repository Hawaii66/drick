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

export default function PlayerQuestion({
  updateAnswer,
  getAnswer,
  players,
}: Props) {
  return (
    <Answer question="player-question">
      <p>Write a question for one player</p>
      <AnswerSelectInput
        label="Player"
        onChange={(val) => updateAnswer("player-question", "player", val)}
        selectable={players.map((player) => ({
          id: player.id,
          label: player.name,
        }))}
        selected={getAnswer("player-question", "player")}
      />
      <AnswerTextAreaInput
        label="Question"
        lines={3}
        onChange={(val) => updateAnswer("player-question", "question", val)}
        value={getAnswer("player-question", "question")}
        help={Help.PlayerQuestions}
      />
    </Answer>
  );
}

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

export default function PlayerChallenge({
  updateAnswer,
  getAnswer,
  players,
}: Props) {
  return (
    <Answer question="player-challenge">
      <p>Write a challenge for one player</p>
      <AnswerSelectInput
        label="Player"
        onChange={(val) => updateAnswer("player-challenge", "player", val)}
        selectable={players.map((player) => ({
          id: player.id,
          label: player.name,
        }))}
        selected={getAnswer("player-challenge", "player")}
      />
      <AnswerTextAreaInput
        label="Challenge"
        lines={3}
        onChange={(val) => updateAnswer("player-challenge", "challenge", val)}
        value={getAnswer("player-challenge", "challenge")}
        help={Help.PlayerChallenges}
      />
    </Answer>
  );
}

import { SmallGame } from "@/types/game";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

type Props = {
  question: SmallGame["type"];
  children: React.ReactNode;
};

const typeToStr = (type: SmallGame["type"]) => {
  switch (type) {
    case "group-challenge":
      return "Group Challenge";
    case "group-question":
      return "Group Question";
    case "player-challenge":
      return "Player Challenge";
    case "player-question":
      return "Player Question";
    case "write-something":
      return "Write Something";
    case "2-truths-1-lie":
      return "2 Truths 1 Lie";
  }
};

export default function Answer({ question, children }: Props) {
  return (
    <AccordionItem value={question}>
      <AccordionTrigger>{typeToStr(question)}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2 px-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}

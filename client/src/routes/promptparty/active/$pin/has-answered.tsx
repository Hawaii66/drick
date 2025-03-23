import { STCEvent } from "@/common/event";
import { usePromptPartyGame } from "@/lib/promptparty";
import { useSocketLatestEvent } from "@/lib/socket";
import PageAnsweredQuestions from "@/pages/promptParty/PageAnsweredQuestions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promptparty/active/$pin/has-answered")({
  component: RouteComponent,
});

function RouteComponent() {
  const onConnect = useSocketLatestEvent<{
    playersWhoAnswered: string[];
    pin: string;
  } | null>(STCEvent.PROMPT_PARTY.PLAYER_ANSWERED_QUESTIONS);
  const { players } = usePromptPartyGame();

  return (
    <PageAnsweredQuestions
      players={players.filter((i) =>
        onConnect?.playersWhoAnswered.includes(i.id),
      )}
      totalPlayers={players.length}
    />
  );
}

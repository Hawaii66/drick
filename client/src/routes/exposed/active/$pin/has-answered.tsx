import { STCEvent } from "@/common/event";
import { useExposedGame } from "@/lib/exposed";
import { useSocketLatestEvent } from "@/lib/socket";
import PageAnsweredQuestions from "@/pages/PageAnsweredQuestions";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exposed/active/$pin/has-answered")({
  component: RouteComponent,
});

function RouteComponent() {
  const onConnect = useSocketLatestEvent<{
    playersWhoAnswered: string[];
    pin: string;
  } | null>(STCEvent.EXPOSED.PLAYER_ANSWERED_QUESTIONS);
  const { players } = useExposedGame();

  return (
    <PageAnsweredQuestions
      players={players.filter((i) =>
        onConnect?.playersWhoAnswered.includes(i.id),
      )}
      totalPlayers={players.length}
    />
  );
}

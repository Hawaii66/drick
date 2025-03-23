import { CTSEvent, STCEvent } from "@/common/event";
import Released from "@/components/lift/Released";
import Score from "@/components/lift/Score";
import ToEarly from "@/components/lift/ToEarly";
import { Badge } from "@/components/ui/badge";
import { LiftMachineState, useLiftMachine } from "@/hooks/useLiftMachine";
import { useLiftGame } from "@/lib/lift";
import {
  useSocket,
  useSocketData,
  useSocketLatestCallback,
} from "@/lib/socket";
import { useState } from "react";

const stateToColor = (state: LiftMachineState, id: string) => {
  switch (state.type) {
    case "pre-round": {
      if (state.downIds.has(id)) {
        return "oklch(0.65 0.2 250)";
      } else {
        return "oklch(0.9 0.05 80)";
      }
    }
    case "waiting":
      return "oklch(0.75 0.25 80)";
    case "release":
      return "oklch(0.75 0.25 145)";
    default:
      throw new Error("Wrong state");
  }
};

export default function PageFinger() {
  const socket = useSocket();
  const { id } = useSocketData();
  const { players } = useLiftGame();
  const [state, reducer] = useLiftMachine();
  const [hasGameEnded, setHasGameEnded] = useState(false);

  useSocketLatestCallback(STCEvent.LIFT.START_ROUND, () => {
    reducer({
      type: "on-wait",
      startTime: new Date().getTime(),
    });
  });
  useSocketLatestCallback<{ ids: string[] }>(
    STCEvent.LIFT.FINGER_STATUS,
    ({ ids }) => {
      if (state.type !== "pre-round") return;
      reducer({ type: "finger-status", ids });
    },
  );
  useSocketLatestCallback(STCEvent.LIFT.TO_EARLY, () => {
    reducer({ type: "to-early" });
  });
  useSocketLatestCallback(STCEvent.LIFT.END_ROUND, () => {
    reducer({ type: "round-ended" });
  });
  useSocketLatestCallback<{
    scores: { id: string; score: number }[];
    result: { id: string; time: number }[];
    toEarly: string[];
  }>(STCEvent.LIFT.COMPLETED, ({ result, scores, toEarly }) => {
    reducer({ type: "on-round-completed", result, scores, toEarly });
  });
  useSocketLatestCallback(STCEvent.LIFT.ENDED, () => {
    setHasGameEnded(true);
  });

  const onFingerDown = () => {
    if (state.type === "pre-round") {
      reducer({ type: "on-finger-down", id });
      socket.emit(CTSEvent.LIFT.FINGER_DOWN, {});
    }
  };

  const onFingerUp = () => {
    if (state.type === "pre-round") {
      reducer({ type: "on-finger-up", id });
      socket.emit(CTSEvent.LIFT.FINGER_UP, {});
    }
    if (state.type === "waiting") {
      socket.emit(CTSEvent.LIFT.FINGER_UP, {});
    }
    if (state.type === "release") {
      const time = new Date().getTime() - state.startTime;
      reducer({ type: "on-finger-up-release", time });
      socket.emit(CTSEvent.LIFT.FINGER_UP, {
        time,
      });
    }
  };

  if (
    state.type === "pre-round" ||
    state.type === "waiting" ||
    state.type === "release"
  ) {
    return (
      <div
        onPointerDown={(e) => {
          onFingerDown();
          e.preventDefault();
          e.stopPropagation();
        }}
        onPointerUp={(e) => {
          onFingerUp();
          e.preventDefault();
          e.stopPropagation();
        }}
        onPointerCancel={(e) => {
          onFingerUp();
          e.preventDefault();
          e.stopPropagation();
        }}
        onContextMenu={(e) => e.preventDefault()}
        className="flex flex-col justify-center items-center gap-4 w-full select-none grow"
        style={{
          backgroundColor: stateToColor(state, id),
        }}
      >
        {state.type === "pre-round" && (
          <>
            {state.downIds.has(id) ? (
              <p>Hold your finger</p>
            ) : (
              <p>Press your finger</p>
            )}
            <div className="flex flex-row flex-wrap gap-2 w-1/2">
              {Array.from(state.downIds).map((id) => (
                <Badge key={id}>{players.find((i) => i.id === id)?.name}</Badge>
              ))}
            </div>
            <p>Waiting for:</p>
            <div className="flex flex-row flex-wrap gap-2 w-1/2">
              {players.map((player) =>
                state.downIds.has(player.id) ? null : (
                  <Badge key={player.id}>{player.name}</Badge>
                ),
              )}
            </div>
          </>
        )}
        {state.type === "waiting" && <p>Wait for green</p>}
        {state.type === "release" && <p>Release your finger</p>}
      </div>
    );
  }

  if (state.type === "released") {
    return <Released releaseTime={state.time} />;
  }

  if (state.type === "score") {
    return (
      <Score
        hasEnded={hasGameEnded}
        onDone={() => reducer({ type: "reset" })}
        players={players}
        result={state.result}
        score={state.scores}
        toEarly={state.toEarly}
      />
    );
  }

  if (state.type === "to-early") {
    return <ToEarly />;
  }

  return <></>;
}

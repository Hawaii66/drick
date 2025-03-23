import { useReducer } from "react";

const handleLiftMachineAction = (
  state: LiftMachineState,
  action: LiftMachineAction,
): LiftMachineState => {
  switch (action.type) {
    case "on-finger-down": {
      if (state.type !== "pre-round") {
        throw new Error("Wrong state");
      }

      return {
        type: "pre-round",
        downIds: state.downIds.add(action.id),
      };
    }
    case "on-finger-up": {
      if (state.type !== "pre-round") {
        throw new Error("Wrong state");
      }

      state.downIds.delete(action.id);
      return {
        type: "pre-round",
        downIds: state.downIds,
      };
    }
    case "on-wait": {
      if (state.type !== "pre-round") {
        throw new Error("Wrong state");
      }

      return {
        type: "waiting",
        startTime: action.startTime,
      };
    }
    case "finger-status": {
      if (state.type !== "pre-round") {
        throw new Error("Wrong state");
      }

      state.downIds = new Set();
      action.ids.forEach((i) => state.downIds.add(i));
      return {
        type: "pre-round",
        downIds: state.downIds,
      };
    }
    case "to-early": {
      if (state.type !== "waiting") {
        throw new Error("Wrong state");
      }

      return {
        type: "to-early",
      };
    }
    case "round-ended": {
      if (state.type === "to-early") return state;

      if (state.type !== "waiting") {
        throw new Error("Wrong state");
      }

      return {
        type: "release",
        startTime: state.startTime,
      };
    }
    case "on-finger-up-release": {
      if (state.type !== "release") {
        throw new Error("Wrong state");
      }

      return {
        type: "released",
        time: action.time,
      };
    }
    case "on-round-completed": {
      if (
        state.type !== "release" &&
        state.type !== "released" &&
        state.type !== "to-early"
      ) {
        throw new Error("Wrong state");
      }

      return {
        type: "score",
        result: action.result,
        scores: action.scores,
        toEarly: action.toEarly,
      };
    }
    case "reset": {
      if (state.type !== "score") {
        throw new Error("Wrong state");
      }

      return {
        type: "pre-round",
        downIds: new Set(),
      };
    }
  }
};

type LiftMachineAction =
  | {
      type: "on-finger-down";
      id: string;
    }
  | {
      type: "on-finger-up";
      id: string;
    }
  | {
      type: "on-finger-up-release";
      time: number;
    }
  | {
      type: "finger-status";
      ids: string[];
    }
  | {
      type: "on-wait";
      startTime: number;
    }
  | { type: "to-early" }
  | { type: "round-ended" }
  | {
      type: "on-round-completed";
      scores: { id: string; score: number }[];
      result: { id: string; time: number }[];
      toEarly: string[];
    }
  | { type: "reset" };

export type LiftMachineState =
  | {
      type: "pre-round";
      downIds: Set<string>;
    }
  | {
      type: "waiting";
      startTime: number;
    }
  | {
      type: "release";
      startTime: number;
    }
  | {
      type: "released";
      time: number;
    }
  | {
      type: "score";
      scores: { id: string; score: number }[];
      result: { id: string; time: number }[];
      toEarly: string[];
    }
  | { type: "to-early" };

export const useLiftMachine = () =>
  useReducer(handleLiftMachineAction, {
    type: "pre-round",
    downIds: new Set<string>(),
  });

type Flatten<T, build extends string[] = []> = T extends Record<string, any>
  ? Flatten<T[keyof T], build>
  : [...build, T];

export const STCEvent = {
  COMMON: {
    PLAYER_JOINED_GAME: "player-joined-game",
    START_GAME: "on-start-game",
    ERROR: "error",
  },
  EXPOSED: {
    ANSWER_QUESTIONS: "answer-questions",
    PLAYER_ANSWERED_QUESTIONS: "player-answered-questions",
    SHOW_QUESTION: "show-question",
    FINISHED: "game-finished",
    ENDED: "game-ended",
  },
} as const;
export type STCEvent = Flatten<typeof STCEvent>[number];

export const CTSEvent = {
  COMMON: {
    HOST_GAME: "host-game",
    JOIN_GAME: "join-game",
    START_GAME: "start-game",
  },
  EXPOSED: {
    ANSWERED_QUESTIONS: "answered-questions",
    NEXT_QUESTION: "next-question",
    END_GAME: "end-game",
  },
};
export type CTSEvent = Flatten<typeof CTSEvent>[number];

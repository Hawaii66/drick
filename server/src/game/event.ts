export const Event = {
  DEBUG: "debug",
  HOST_GAME: "host-game",
  JOIN_GAME: "join-game",
  START_GAME: "start-game",
  GAME_PLAYER_JOIN_GAME: "game-player-join-game",
  GAME_PLAYER_ANSWER_QUESTIONS: "game-player-answer-questions",
  GAME_PLAYER_ANSWERED_QUESTIONS: "game-player-answered-questions",
  GAME_PLAYER_READY_ANSWERED: "game-player-ready-answered",
  GAME_SHOW_QUESTION: "game-show-question",
  GAME_NEXT_QUESTION: "game-next-question",
  GAME_FINISHED: "game-finished",
  GAME_HOST_END_GAME: "game-end-game",
  GAME_ENDED: "game-ended",
} as const;

export type Event = (typeof Event)[keyof typeof Event];

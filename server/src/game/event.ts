export const Event = {
  HOST_GAME: "host-game",
  JOIN_GAME: "join-game",
  GAME_PLAYER_JOIN_GAME: "game-player-join-game",
  DEBUG: "debug",
} as const;

export type Event = (typeof Event)[keyof typeof Event];

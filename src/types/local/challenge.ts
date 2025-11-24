import { z } from 'zod';

export const LocalChallengeConfigSchema = z.object({
    numberOfPlayers: z.number().min(1).max(20),
    challengesPerPlayer: z.number().min(1).max(5),
    mode: z.enum(["normal", "sport", "spicy", "party"]),
})

export type LocalChallengeConfig = z.infer<typeof LocalChallengeConfigSchema>;

import z from "zod";

export const GameState = {
    WAITING_FOR_PLAYERS: "waiting_for_players",
    IN_PROGRESS: "in_progress",
}

export const GameType = {
    ANONYMOUS: "anonymous",
}

export const GameSchema = z.object({
    _id: z.string(),
    pin: z.string().min(6).max(6),
    owner: z.string(),
    players: z.string().array(),
    state: z.enum([GameState.WAITING_FOR_PLAYERS, GameState.IN_PROGRESS]),
    type: z.enum([GameType.ANONYMOUS]),
});
export type Game = z.infer<typeof GameSchema>;


export const AnonymousQuestionSchema = z.object({
    question: z.string().min(1),
    targetPlayer: z.string().min(1)
});
export type AnonymousQuestion = z.infer<typeof AnonymousQuestionSchema>;

export const AnonymouseGameState = {
    ENTER_QUESTIONS: "enter_questions",
    ANSWER_QUESTIONS: "answer_questions",
    FINISHED: "finished",
}

export const AnonymouseGameSchema = GameSchema.extend({
    data: z.object({
        questions: AnonymousQuestionSchema.array(),
        questionIndex: z.number().nullable(),
        state: z.enum([AnonymouseGameState.ENTER_QUESTIONS, AnonymouseGameState.ANSWER_QUESTIONS, AnonymouseGameState.FINISHED]),
    }),
});
export type AnonymouseGame = z.infer<typeof AnonymouseGameSchema>;



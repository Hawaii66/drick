import z from "zod";

export const GameState = {
    WAITING_FOR_PLAYERS: "waiting_for_players",
    IN_PROGRESS: "in_progress",
}

export const GameType = {
    ANONYMOUS: "anonymous",
    REACTION_TIME:"reactionTime"
}

export const GameSchema = z.object({
    _id: z.string(),
    pin: z.string().min(6).max(6),
    owner: z.string(),
    players: z.string().array(),
    state: z.enum([GameState.WAITING_FOR_PLAYERS, GameState.IN_PROGRESS]),
    type: z.enum([GameType.ANONYMOUS,GameType.REACTION_TIME]),
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

export const ReactionTimeGameState = {
    REACTING:"reacting",
    RESULTS:"results",
    FINISHED:"finished",
}

export const ReactionTimeGameSchema = GameSchema.extend({
    data:z.object({
        rounds:z.number(),
        currentRound:z.number(),
        scores:z.record(z.string(), z.number().nullable()),
        state:z.enum([ReactionTimeGameState.REACTING, ReactionTimeGameState.RESULTS, ReactionTimeGameState.FINISHED]),
        delayUntilReactMs:z.number()
    })
})
export type ReactionTimeGame = z.infer<typeof ReactionTimeGameSchema>;

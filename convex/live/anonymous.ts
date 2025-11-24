import z from "zod";
import { GameSchema, GameState } from "./game";
import { Id } from "../_generated/dataModel"
import { DatabaseReader, mutation, query } from "../_generated/server"
import { v } from "convex/values";

export const AnonymousQuestionSchema = z.object({
    question: z.string(),
    targetPlayer: z.string()
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
        questionIndex:z.number().nullable(),
        state:z.enum([AnonymouseGameState.ENTER_QUESTIONS, AnonymouseGameState.ANSWER_QUESTIONS, AnonymouseGameState.FINISHED]),
    }),
});
export type AnonymouseGame = z.infer<typeof AnonymouseGameSchema>;

export async function GetAnonymouseGame(id:Id<"games">, db:DatabaseReader){
    const game = await db.get(id);
    if(!game){
        throw new Error("Game not found");
    }
    const parsedGame = AnonymouseGameSchema.safeParse({
        ...game,
        data: JSON.parse(game.data),
    });
    if(!parsedGame.success){
        console.log(parsedGame.error);
        throw new Error("Game data is invalid");
    }
    return parsedGame.data;
}

export const createGame = mutation({
    args:{
        player:v.string(),
    },
    handler:async(ctx,args)=>{
        const pin = Math.floor(100000 + Math.random() * 900000).toString();

        const game:Omit<AnonymouseGame,"_id"> = {
            pin: pin,
            owner: args.player,
            players: [args.player],
            state: "waiting_for_players",
            type:"anonymous",
            data: {
                questionIndex: null,
                questions: [],
                state: AnonymouseGameState.ENTER_QUESTIONS,
            },
        }
        const toInsert = {
            ...game,
            data: JSON.stringify(game.data),
        }

        const id = await ctx.db.insert("games", toInsert);

        return id;
    }
})

export const getGame = query({
    args:{
        id:v.id("games"),
    },
    handler:async(ctx,args)=>{
        return GetAnonymouseGame(args.id, ctx.db);
    }
})

export const addQuestion = mutation({
    args:{
        gameId:v.id("games"),
        question:v.string(),
        targetPlayer:v.string(),
    },
    handler:async(ctx,args)=>{
        const game = await GetAnonymouseGame(args.gameId, ctx.db);

        if(game.data.state !== AnonymouseGameState.ENTER_QUESTIONS){
            throw new Error("Game not accepting questions");
        }

        const newQuestion:AnonymousQuestion= {
            question: args.question,
            targetPlayer: args.targetPlayer,
        }

        const newData:AnonymouseGame["data"] = {
            ...game.data,
            questions: [...game.data.questions, newQuestion],
        }

        await ctx.db.patch(args.gameId, {
            data:  JSON.stringify(newData),       
        });
    }
})

export const startEnteringQuestions = mutation({
    args:{
        gameId:v.id("games"),
    },
    handler:async(ctx,args)=>{
        const game = await GetAnonymouseGame(args.gameId, ctx.db);
        
        if(game.data.state !== AnonymouseGameState.ENTER_QUESTIONS){
            throw new Error("Game not in question entry state");
        }

        const newData:AnonymouseGame["data"] = {
            ...game.data,
            state: AnonymouseGameState.ENTER_QUESTIONS,
        }

        await ctx.db.patch(args.gameId, {
            data:  JSON.stringify(newData),       
            state:GameState.IN_PROGRESS,
        });
    }
})

export const startAnsweringQuestions = mutation({
    args:{
        gameId:v.id("games"),
    },
    handler:async(ctx,args)=>{
        const game = await GetAnonymouseGame(args.gameId, ctx.db);
        
        if(game.data.state !== AnonymouseGameState.ENTER_QUESTIONS){
            throw new Error("Game not in question entry state");
        }

        const newData:AnonymouseGame["data"] = {
            ...game.data,
            questionIndex: 0,
            state: AnonymouseGameState.ANSWER_QUESTIONS,
        }

        await ctx.db.patch(args.gameId, {
            data: JSON.stringify(newData),       
        });
    }
})

export const onNextQuestion = mutation({
    args:{
        gameId:v.id("games"),
    },
    handler:async(ctx,args)=>{
        const game = await GetAnonymouseGame(args.gameId, ctx.db);
        
        if(game.data.state !== AnonymouseGameState.ANSWER_QUESTIONS){
            throw new Error("Game not in answer question state");
        }

        const newData:AnonymouseGame["data"] = {
            ...game.data,
            questionIndex: game.data.questionIndex !== null ? game.data.questionIndex + 1 : 0,
        }

        if(newData.questionIndex && newData.questionIndex >= newData.questions.length){
            newData.state = AnonymouseGameState.FINISHED;
        }

        await ctx.db.patch(args.gameId, {
            data: JSON.stringify(newData),       
        });
    }
})

import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    games: defineTable({
        pin: v.string(),
        players: v.array(v.string()),
        state: v.string(),
        data: v.string(),
        type: v.string(),
        owner: v.string(),
    }).index("by_pin",[
        "pin"
    ] ),
})

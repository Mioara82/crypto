import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    id: v.string(),
    username: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  portfolioCoins: defineTable({
    userId: v.string(),
    coinId: v.string(),
    name: v.string(),
    symbol: v.string(),
    image: v.string(),
    currentPrice: v.number(),
    purchaseAmount: v.number(),
    purchasedDate: v.string(),
  }),
});

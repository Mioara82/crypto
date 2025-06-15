import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    id: v.string(),
    email: v.string(),
    username: v.string(), 
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  portfolioCoins: defineTable({
    userId: v.id("users"), 
    name: v.string(),
    coinId: v.string(),
    symbol: v.string(),
    image: v.string(),
    currentPrice: v.number(),
    purchaseAmount: v.number(),
    purchasedDate: v.string(),
  }).index("by_user", ["userId"]),
});

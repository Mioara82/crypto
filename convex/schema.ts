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
    symbol: v.optional(v.string()),
    image: v.optional(v.string()),
    currentPrice: v.optional(v.float64()),
    purchaseAmount: v.float64(),
    purchasedDate: v.string(),
  }).index("by_user", ["userId"]),
});

import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPortfolioCoin = mutation({
  args: {
    name: v.string(),
    coinId: v.string(),
    symbol: v.optional(v.string()),
    image: v.optional(v.string()),
    currentPrice: v.optional(v.float64()),
    purchaseAmount: v.float64(),
    purchasedDate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
      
    if (!user) throw new Error("User not found in DB");
    
    return await ctx.db.insert("portfolioCoins", {
      userId: user._id, // Convex internal ID
      ...args,
    });
  },
});

export const getPortfolioCoins = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db
      .query("portfolioCoins")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();
  },
});

export const updatePortfolioCoin = mutation({
  args: {
    id: v.id("portfolioCoins"),
    name: v.optional(v.string()),
    purchaseAmount: v.optional(v.number()),
    purchasedDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Coin not found");
    
    await ctx.db.patch(args.id, {
      name: args.name ?? existing.name,
      purchaseAmount: args.purchaseAmount ?? existing.purchaseAmount,
      purchasedDate: args.purchasedDate ?? existing.purchasedDate,
    });
  },
});

export const deletePortfolioCoin = mutation({
  args: { id: v.id("portfolioCoins") },
  handler: async (ctx, { id }) => {
    return await ctx.db.delete(id);
  },
});

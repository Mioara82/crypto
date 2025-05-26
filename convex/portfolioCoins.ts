import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addPortfolioCoin = mutation({
  args: {
    userId: v.string(),
    coinId: v.string(),
    name: v.string(),
    symbol: v.string(),
    image: v.string(),
    currentPrice: v.number(),
    purchaseAmount: v.number(),
    purchasedDate: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.db.insert("portfolioCoins", {
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
    name: v.string(),
    symbol: v.string(),
    image: v.string(),
    currentPrice: v.number(),
    purchaseAmount: v.number(),
    purchasedDate: v.string(),
  },
  handler: async (
    ctx,
    {
      id,
      name,
      symbol,
      image,
      currentPrice,
      purchaseAmount,
      purchasedDate,
    },
  ) => {
    return await ctx.db.patch(id, {
      name,
      symbol,
      image,
      currentPrice,
      purchaseAmount,
      purchasedDate,
    });
  },
});

export const deletePortfolioCoin = mutation({
  args: { id: v.id("portfolioCoins") },
  handler: async (ctx, { id }) => {
    return await ctx.db.delete(id);
  },
});
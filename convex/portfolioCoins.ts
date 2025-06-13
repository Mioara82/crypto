import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { portfolioCoinSchema } from "./schemas/portfolioCoinSchema";

export const addPortfolioCoin = mutation({
  args: {
    userId: v.string(),
    ...portfolioCoinSchema.fields,
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
    ...portfolioCoinSchema.fields,
  },
  handler: async (
    ctx,
    { id, name, symbol, image, currentPrice, purchaseAmount, purchasedDate },
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

import {v} from "convex/values";

export const portfolioCoinSchema = v.object({
  coinId:v.string(),
  name: v.string(),
  symbol: v.string(),
  image: v.string(),
  currentPrice: v.number(),
  purchaseAmount: v.number(),
  purchasedDate: v.string(),
});
import { action } from "./_generated/server";
import { v } from "convex/values";

const apiKey: string = process.env.COINGECKO_API_KEY || "";

const buildCoinGeckoUrl = (endpoint: string, query: any): string => {
  const baseUrl = "https://api.coingecko.com/api/v3";
  let queryString;
  switch (endpoint) {
    case "ChartData":
      return `${baseUrl}/coins/${query.id}/market_chart?vs_currency=${query.currency}&days=${query.days}`;

    case "CoinDetails":
      return `${baseUrl}/coins/${query.id}`;

    case "CoinsTableDetails":
      return `${baseUrl}/coins/markets?vs_currency=${query.currency}&order=${query.sortQuery}&per_page=${query.coinsPerPage}&page=${query.currentPage}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

    case "MarketDataAPI":
      return `${baseUrl}/global`;

    case "CoinSearch":
      queryString = new URLSearchParams(query).toString();
      return `${baseUrl}/coins/markets?${queryString}`;

    case "SearchData":
      return `${baseUrl}/coins/markets/?vs_currency=${query.currency}`;

    default:
      queryString = new URLSearchParams(query).toString();
      return `${baseUrl}/${endpoint}?${queryString}`;
  }
};

const requestTimes: number[] = [];

export const fetchCoins = action({
  args: {
    endpoint: v.string(),
    query: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    // Clean old requests (older than 1 minute)
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    const recentRequests = requestTimes.filter((time) => time > oneMinuteAgo);

    // If we've made 25+ requests in the last minute, wait
    if (recentRequests.length >= 25) {
      const oldestRequest = Math.min(...recentRequests);
      const waitTime = 60000 - (now - oldestRequest) + 1000;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    requestTimes.push(now);

    if (!args.endpoint) {
      throw new Error("Endpoint is required");
    }
    if (!args.query && args.endpoint !== "MarketData") {
      throw new Error("Query is required");
    }

    const url = buildCoinGeckoUrl(args.endpoint, args.query);

    const response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY || "",
      },
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Please wait a moment.`);
      }
      throw new Error(`CoinGecko fetch failed: ${response.statusText}`);
    }
    const jsonResponse = await response.json();
  
    return await jsonResponse;
  },
});

import { query } from "./_generated/server";

const apiKey: string = process.env.VITE_COINGECKO_API_KEY || "";

export const fetchCoins = query(
  async (_, args: { endpoint: string; query: Record<string, string> }) => {
    const queryString = new URLSearchParams(args.query).toString();
    const url = `https://api.coingecko.com/api/v3/${args.endpoint}?${queryString}`;
    const response = await fetch(url, {
        headers:{
            "x-cg-demo-api-key": apiKey || ""
        }
    });
    if (!response.ok) {
      throw new Error(`CoinGecko fetch failed: ${response.statusText}`);
    }
    return await response.json();
  },
);

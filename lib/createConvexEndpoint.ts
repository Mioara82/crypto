import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { convex } from "@/convex/client";
import { api as convexApi } from "@/convex/_generated/api";

export interface ConvexQueryArgs {
  endpoint: string;
  query: Record<string, string>;
}

export interface ChartDataArgs extends ConvexQueryArgs {
  id: string;
  currency: string;
  days: string;
}

export interface CoinsTableDetailsArgs extends ConvexQueryArgs {
  currency:string;
  currentPage:number;
  sortQuery:string;
}

export interface HistoricalCoinDataArgs extends ConvexQueryArgs {
  id:string;
  date:string;
}

export const createConvexEndpoint = <TArgs extends ConvexQueryArgs = ConvexQueryArgs, TResult = any, TTransformed = any>(
  tagType: string, 
  options?: {
    keepUnusedDataFor?: number;
    refetchOnMountOrArgChange?: boolean | number;
    refetchOnFocus?: boolean;
    refetchOnReconnect?: boolean;
     providesTags?: (result: TTransformed | undefined, error: any, arg: TArgs) => any[];
    transformResponse?: (response: TResult, arg: TArgs) => TTransformed;
  }
) => ({
  async queryFn(args: TArgs) {
    try {
      const rawData = await convex.query(
        convexApi.fetchCoins.fetchCoins, // or just convexApi.fetchCoins if that works
        {
          endpoint: args.endpoint,
          query: args.query,
        }
      );
      
      // Apply transformation if provided
      const data = options?.transformResponse ? options.transformResponse(rawData, args) : rawData;
      
      return { data };
    } catch (error: any) {
      return {
        error: {
          status: "CUSTOM_ERROR",
          error: error instanceof Error ? error.message : String(error),
        },
      };
    }
  },
  keepUnusedDataFor: options?.keepUnusedDataFor ?? 300,
  refetchOnMountOrArgChange: options?.refetchOnMountOrArgChange,
  refetchOnFocus: options?.refetchOnFocus,
  refetchOnReconnect: options?.refetchOnReconnect,
  providesTags: options?.providesTags || [{type: tagType as any}],
});
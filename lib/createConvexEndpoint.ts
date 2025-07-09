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
  coinsPerPage:number;
  currentPage:number;
  sortQuery:string;
}

export interface HistoricalCoinDataArgs extends ConvexQueryArgs {
  id:string;
  date:string;
}

export interface SearchDataArgs extends ConvexQueryArgs {
  currency: string;
}

export const createConvexEndpoint = <TArgs extends ConvexQueryArgs = ConvexQueryArgs, TResult = any, TTransformed = any>(
  tagType: string, 
  options?: {
    keepUnusedDataFor?: number;
    refetchOnMountOrArgChange?: boolean | number;
    refetchOnFocus?: boolean;
    refetchOnReconnect?: boolean;
     providesTags?: (_result: TTransformed | undefined, _error: any, _arg: TArgs) => any[];
    transformResponse?: (_response: TResult, _arg: TArgs) => TTransformed;
  }
) => ({
  async queryFn(args: TArgs) {
    try {
      const rawData = await convex.action(
        convexApi.fetchCoins.fetchCoins,
        {
          endpoint: args.endpoint,
          query: args.query,
        }
      );
      
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
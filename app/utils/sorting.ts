import { sortingObject } from "@/lib/types/types";

export const sortingObj: sortingObject[] = [
  { name: "market cap ascending", value: "market_cap_asc", id: 1 },
  { name: "market cap descending", value: "market_cap_desc", id: 2 },
  { name: "volume ascending", value: "volume_asc", id: 3 },
  { name: "volume descending", value: "volume_desc", id: 4 },
];

export const sortingFromAPILookupTable: { [key: string]: string } = {
  market_cap_asc: "market_cap_desc",
  market_cap_desc: "volume_desc",
  volume_asc: "market_cap_asc",
  volume_desc: "volume_asc",
};


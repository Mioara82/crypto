import { daysObject } from "@/lib/types/types";
export const chartFilter: daysObject[] = [
  { name: "1D", period: 1, id: 1 },
  { name: "7D", period: 7, id: 2 },
  { name: "14D", period: 14, id: 3 },
  { name: "1M", period: 30, id: 4 },
  { name: "6M", period: 180, id: 5 },
  { name: "1Y", period: 365, id: 6 },
  { name: "5Y", period: "max", id: 7 },
];

import { z } from "zod";
import { getCurrentDate } from "@/app/utils/formatHelpers";

export const portfolioFormSchema = z.object({
  coinName: z
    .string()
    .min(1, "Select a coin"), 
  purchasedAmount: z
   .number()
    .min(0.01, "Purchase amount must be greater than 0"),
  purchasedDate: z
    .string()
    .refine((date) => !Number.isNaN(Date.parse(date)), {
      message: "Purchased date must be a valid date",
    })
    .refine((date) => date <= getCurrentDate(), {
      message: "The purchase date must be in the past",
    }),
});

export type PortfolioFormData = z.infer<typeof portfolioFormSchema>;



import { query } from "./_generated/server";

export const hello = query(async (ctx) => {
  return "Hello from Convex!";
});

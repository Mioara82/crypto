import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const {
      subject,
      name = "Anonymous",
      email = "no-email",
      tokenIdentifier,
    } = identity;

    const username = email.split("@")[0];

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (existingUser !== null) {
      const shouldUpdateUser =
        existingUser.name !== name ||
        existingUser.email !== email ||
        existingUser.username !== username;

      if (shouldUpdateUser) {
        await ctx.db.patch(existingUser._id, { name, email, username });
      }
      return existingUser._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      id: subject,
      name,
      email,
      username,
      tokenIdentifier,
    });
  },
});

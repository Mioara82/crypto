import { query, mutation } from "./_generated/server";

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called getUser without authentication present");
    }

    const subject = identity.subject;
    const tokenIdentifier = identity.tokenIdentifier;
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
      .unique();

    if (!user) {
      throw new Error(`User with id ${subject} not found`);
    }

    return user;
  },
});

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    const subject = identity.subject;
    const email = identity.email ?? "no-email";
    const tokenIdentifier = identity.tokenIdentifier;

    const username = email.split("@")[0];

    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
    if (existingUser !== null) {
      const shouldUpdateUser =
        existingUser.email !== email || existingUser.username !== username;

      if (shouldUpdateUser) {
        await ctx.db.patch(existingUser._id, { email, username });
      }
      return existingUser._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      id: subject,
      email,
      username,
      tokenIdentifier,
    });
  },
});

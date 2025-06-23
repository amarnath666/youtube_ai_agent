import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    return user;
  },
});

export const createUserIfNotExists = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        image: v.optional(v.string()),
    },
      handler: async (ctx, args) => {
        const { email, name, image } = args;

        const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

      if (!existing) {
        await ctx.db.insert("users", {
          email,
          name,
          image,
          createdAt: Date.now(),
        });
      }

      return { email, name, image };
    },
});

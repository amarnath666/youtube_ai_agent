import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  // Auth tables for @convex-dev/auth
  ...authTables,
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()), // profile picture (if using Google auth)
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  chats: defineTable({
    title: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  messages: defineTable({
    chatId: v.string(),
    content: v.string(),
    role: v.union(v.literal("user"), v.literal("assistant")),
    createdAt: v.number(),
  }).index("by_chat", ["chatId"]),
});

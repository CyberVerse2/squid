import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    installationId: v.optional(v.number()),
    profileImg: v.string()
  }),
  projects: defineTable({
    name: v.string(),
    description: v.string(),
    userId: v.id('users')
  }),
  issues: defineTable({
    title: v.string(),
    description: v.string(),
    projectId: v.string(),
    userId: v.string()
  })
});
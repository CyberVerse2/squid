import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';
export default defineSchema({
  users: defineTable({
    name: v.string(),
    githubUsername: v.optional(v.string()),
    clerkId: v.string(),
    email: v.string(),
    installationId: v.optional(v.number()),
    accessToken: v.optional(v.string()),
    profileUrl: v.optional(v.string())
  })
    .index('by_clerkId', ['clerkId'])
    .index('by_githubUsername', ['githubUsername']),
  repositories: defineTable({
    fullName: v.string(),
    description: v.string(),
    url: v.string(),
    type: v.union(v.literal('private'), v.literal('public')),
    ownerId: v.optional(v.id('users')),
    issues: v.optional(v.array(v.id('issues'))),
    starCount: v.number(),
    watchCount: v.number(),
    forkCount: v.number(),
    createdDate: v.string(),
    updatedDate: v.string(),
    lastPushDate: v.string()
  }).index('ownerId', ['ownerId']),
  issues: defineTable({
    title: v.string(),
    issueId: v.number(),
    url: v.string(),
    body: v.string(),
    repositoryId: v.optional(v.id('repositories')),
    ownerId: v.optional(v.id('users')),
    issueCreator: v.object({
      profilePic: v.string(),
      username: v.string()
    }),
    state: v.union(v.literal('open'), v.literal('closed')),
    labels: v.object({
      id: v.number(),
      name: v.string(),
      color: v.string(),
      url: v.string(),
      description: v.string(),
      createdAt: v.string(),
      updatedAt: v.string()
    })
  })
    .index('repositoryId', ['repositoryId'])
    .index('ownerId', ['ownerId'])
});

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
    number: v.number(),
    url: v.string(),
    body: v.string(),
    repositoryName: v.string(),
    repositoryId: v.optional(v.id('repositories')),
    ownerId: v.optional(v.id('users')),
    issueCreator: v.object({
      profilePic: v.string(),
      username: v.string()
    }),
    state: v.union(v.literal('open'), v.literal('closed')),
    labels: v.optional(
      v.array(
        v.object({
          id: v.number(),
          name: v.string(),
          color: v.string(),
          url: v.string()
        })
      )
    ),
    assignees: v.optional(
      v.array(
        v.object({
          id: v.number(),
          username: v.string(),
          url: v.string(),
          type: v.string(),
          profilePic: v.string()
        })
      )
    ),
    createdAt: v.string(),
    updatedAt: v.string(),
    closedAt: v.optional(v.union(v.string(), v.null()))
  })
    .index('repositoryId', ['repositoryId'])
    .index('issueId', ['issueId'])
    .index('number', ['number'])
    .index('ownerId', ['ownerId']),

  comments: defineTable({
    body: v.string(),
    url: v.string(),
    commentId: v.number(),
    issueId: v.id('issues'),
    createdAt: v.string(),
    updatedAt: v.string()
  })
    .index('issueId', ['issueId'])
    .index('commentId', ['commentId'])
    .index('createdAt', ['createdAt'])
    .index('updatedAt', ['updatedAt'])
    .index('body', ['body'])
});

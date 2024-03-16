import { v } from 'convex/values';
import { userMutation } from './utils';

export const createIssue = userMutation({
  args: {
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
  },
  async handler(ctx, args) {
    return ctx.db.insert('issues', args);
  }
});

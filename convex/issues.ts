import { v } from 'convex/values';
import { userMutation } from './utils';
import { getAll, getOneFrom, getManyFrom, getManyVia } from 'convex-helpers/server/relationships';
import { Id } from './_generated/dataModel';

export const createIssue = userMutation({
  args: {
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
  },
  async handler(ctx, args) {
    return ctx.db.insert('issues', args);
  }
});

export const getIssues = userMutation({
  args: {
    repositoryId: v.id('repositories')
  },
  async handler(ctx, args) {
    return getManyFrom(ctx.db, 'issues', 'ownerId', ctx.user.id);
  }
});

export const getIssue = userMutation({
  args: {
    issueId: v.id('issues')
  },
  async handler(ctx, args) {
    // return getOneFrom(ctx.db, 'issues', 'ownerId', ctx.user.id, args.issueId);
  }
});

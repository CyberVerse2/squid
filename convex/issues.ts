import { v } from 'convex/values';
import { userMutation, userQuery } from './utils';
import { getAll, getOneFrom, getManyFrom, getManyVia } from 'convex-helpers/server/relationships';
import { Id } from './_generated/dataModel';

export const createIssue = userMutation({
  args: {
    title: v.string(),
    issueId: v.number(),
    number: v.number(),
    url: v.string(),
    body: v.union(v.string(), v.null()),
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
    console.log(ctx.user._id);
    return ctx.db.insert('issues', { ...args, ownerId: ctx.user._id });
  }
});

export const getIssues = userQuery({
  args: {},
  async handler(ctx, args) {
    const issues = await getManyFrom(ctx.db, 'issues', 'ownerId', ctx.user._id);
    return issues;
  }
});

export const getIssue = userMutation({
  args: {
    issueId: v.id('issues')
  },
  async handler(ctx, args) {
    return await ctx.db.get(args.issueId);
  }
});

export const getIssueComments = userQuery({
  args: {
    issueId: v.id("issues")
  },
  async handler(ctx, args) {
    // const issue = await ctx.db
    //   .query('issues')
    //   .withIndex('issueId', (q) => q.eq('issueId', args.issueId))
    //   .unique();
    return await getManyFrom(ctx.db, 'comments', 'issueId', args.issueId);
  }
});

export const createComment = userMutation({
  args: {
    body: v.string(),
    url: v.string(),
    issueId: v.number(),
    commentId: v.number(),
    createdAt: v.string(),
    updatedAt: v.string()
  },
  async handler(ctx, args) {
    const issue = await ctx.db
      .query('issues')
      .withIndex('issueId', (q) => q.eq('issueId', args.issueId))
      .unique();
    return ctx.db.insert('comments', { ...args, issueId: issue._id });
  }
});

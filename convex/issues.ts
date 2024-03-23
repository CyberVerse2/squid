import { ConvexError, v } from 'convex/values';
import { userMutation, userQuery } from './utils';
import { getAll, getOneFrom, getManyFrom, getManyVia } from 'convex-helpers/server/relationships';
import { internalMutation, internalQuery, mutation } from './_generated/server';

export const createIssue = mutation({
  args: {
    title: v.string(),
    issueId: v.number(),
    number: v.number(),
    url: v.string(),
    body: v.union(v.string(), v.null()),
    repositoryName: v.string(),
    repositoryId: v.optional(v.id('repositories')),
    username: v.string(),
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
    const issue = await ctx.db
      .query('issues')
      .withIndex('issueId', (q) => q.eq('issueId', args.issueId))
      .unique();
    if (!issue) {
      const user = await getOneFrom(ctx.db, 'users', 'by_githubUsername', args.username);
      if (!user) throw new ConvexError(`User with username ${args.username} not found`);

      delete args.username;

      const newIssue = { ...args, ownerId: user._id };
      const issueId = await ctx.db.insert('issues', newIssue);

      const issue = await ctx.db.get(issueId);
      return issue;
    }
  }
});

export const internalCreateIssue = internalMutation({
  args: {
    title: v.string(),
    issueId: v.number(),
    number: v.number(),
    url: v.string(),
    body: v.union(v.string(), v.null()),
    repositoryName: v.string(),
    repositoryId: v.optional(v.id('repositories')),
    username: v.string(),
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
    return createIssue(ctx, args);
  }
});

export const getIssues = userQuery({
  args: {},
  async handler(ctx, args) {
    const issues = await ctx.db
      .query('issues')
      .withIndex('ownerId', (q) => q.eq('ownerId', ctx.user._id))
      .order('desc')
      .collect();

    if (!issues) {
      throw new ConvexError('No issues found');
    }
    return issues;
  }
});

export const getIssue = userQuery({
  args: {
    issueId: v.id('issues')
  },
  async handler(ctx, args) {
    const issue = await ctx.db.get(args.issueId);

    if (!issue) {
      throw new ConvexError(`Issue with id ${args.issueId} not found`);
    }
    return issue;
  }
});

export const getIssueByIssueIndex = internalQuery({
  args: {
    issueId: v.number()
  },
  async handler(ctx, args) {
    const issue = await getOneFrom(ctx.db, 'issues', 'issueId', args.issueId);

    if (!issue) {
      throw new ConvexError(`Issue with id ${args.issueId} not found`);
    }
    return issue;
  }
});

export const getIssueComments = userQuery({
  args: {
    issueId: v.id('issues')
  },
  async handler({ db }, { issueId }) {
    const comments = await db
      .query('comments')
      .withIndex('issueId', (q) => q.eq('issueId', issueId))
      .collect();

    return comments;
  }
});

export const createComment = mutation({
  args: {
    body: v.string(),
    url: v.string(),
    issueId: v.id('issues'),
    user: v.object({
      username: v.string(),
      profilePic: v.string()
    }),
    commentId: v.number(),
    createdAt: v.string(),
    updatedAt: v.string()
  },
  async handler(ctx, args) {
    const issue = await ctx.db.get(args.issueId);

    if (!issue) {
      throw new ConvexError(`Issue with index ${args.issueId} not found`);
    }
    const existingComment = await ctx.db
      .query('comments')
      .withIndex('commentId', (q) => q.eq('commentId', args.commentId))
      .unique();

    if (!existingComment) {
      const newComment = await ctx.db.insert('comments', { ...args, issueId: issue._id });
      return newComment;
    }
  }
});

export const internalCreateComment = internalMutation({
  args: {
    body: v.string(),
    url: v.string(),
    issueId: v.id('issues'),
    user: v.object({
      username: v.string(),
      profilePic: v.string()
    }),
    commentId: v.number(),
    createdAt: v.string(),
    updatedAt: v.string()
  },
  async handler(ctx, args) {
    return await createComment(ctx, args);
  }
});

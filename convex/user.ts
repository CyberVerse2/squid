('use node');
import { v } from 'convex/values';
import {
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query
} from './_generated/server';
import { ConvexError } from 'convex/values';
import { getCurrentUser, userMutation, userQuery } from './utils';

// export const internalGetUser = internalQuery({
//   args: {},
//   async handler(ctx, _) {
//     await getUser(ctx, {});
//   }
// });

export const getUser = userQuery({
  async handler(ctx) {
    return await getCurrentUser(ctx);
  }
});

export const internalGetUser = internalQuery({
  handler(ctx) {
    return getUser(ctx, {});
  }
});

export const createUser = userMutation({
  args: {},
  async handler(ctx, _) {
    const user = ctx.user;
    const { subject, email, name, pictureUrl, nickname } = await ctx.auth.getUserIdentity();

    if ('cause' in user) {
      if (user.cause?.type === 'NOT_FOUND') {
        await ctx.db.insert('users', {
          clerkId: subject,
          email: email,
          name: name,
          githubUsername: nickname,
          profileUrl: pictureUrl
        });
      }
    } else if (user.githubUsername) {
      patchUser(ctx, {}); // Pass an empty object as the second argument
    }
  }
});
export const patchUser = userMutation({
  args: {},

  async handler(ctx) {
    const { subject, email, name, profileUrl, nickname } = await ctx.auth.getUserIdentity();
    const user = ctx.user;

    const [userWithEmailExists] = await ctx.db
      .query('users')
      .withIndex('by_githubUsername', (q) => q.eq('githubUsername', user?.githubUsername))
      .collect();

    return userWithEmailExists
      ? null
      : ctx.db.insert('users', {
          clerkId: subject,
          email,
          name,
          profileUrl,
          githubUsername: nickname
        });
  }
});

export const updateUser = mutation({
  args: {
    nickname: v.string(),
    installationId: v.number()
  },
  async handler(ctx, { nickname, installationId }) {
    const [user] = await ctx.db
      .query('users')
      .withIndex('by_githubUsername', (q) => q.eq('githubUsername', nickname.toLowerCase()))
      .collect();

    if (!user.githubUsername) throw new ConvexError('User with the github username not found');

    await ctx.db.patch(user._id, { installationId });
  }
});

export const internalUpdateUser = internalMutation({
  args: {
    nickname: v.string(),
    installationId: v.number()
  },
  async handler(ctx, { nickname, installationId }) {
    return updateUser(ctx, { nickname, installationId });
  }
});

export const updateUserOauthCode = mutation({
  args: {
    oauthCode: v.any()
  },
  async handler(ctx, { oauthCode }) {
    const { githubUsername } = await getCurrentUser(ctx);

    const user = await ctx.db
      .query('users')
      .withIndex('by_githubUsername', (q) => q.eq('githubUsername', githubUsername))
      .unique();
    if (!user.githubUsername) throw new ConvexError('User with the github username not found');

    if (oauthCode) {
      await ctx.db.patch(user._id, { oauthCode });
    } else {
      return null;
    }
  }
});

export const updateUserAccessToken = mutation({
  args: {
    accessToken: v.union(v.string(), v.null())
  },
  async handler(ctx, { accessToken }) {
    const { githubUsername } = await getCurrentUser(ctx);
    const user = await ctx.db
      .query('users')
      .withIndex('by_githubUsername', (q) => q.eq('githubUsername', githubUsername))
      .unique();

    if (!user.githubUsername) throw new ConvexError('User with the github username not found');

    if (accessToken) {
      await ctx.db.patch(user._id, { accessToken });
    }
  }
});

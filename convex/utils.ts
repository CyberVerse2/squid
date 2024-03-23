import { internal } from './_generated/api';
import { QueryCtx, action, httpAction, mutation, query } from './_generated/server';
import ENVIRONMENT from './environment';
import {
  customMutation,
  customCtx,
  customQuery,
  customAction
} from 'convex-helpers/server/customFunctions';
import { ConvexError, v } from 'convex/values';

export const getCurrentUser = async (ctx: QueryCtx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error('Not authenticated');
  }
  if (!identity.email) {
    throw new Error(`signup has no email address: ${JSON.stringify(identity)}`);
  }
  const user = await ctx.db
    .query('users')
    .withIndex('by_clerkId', (q) => q.eq('clerkId', identity.subject))
    .unique();
  return (
    user ?? {
      cause: { type: 'NOT_FOUND' }
    }
  );
};

export const userMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    console.log(user)
    if (user === undefined) {
      throw new ConvexError('User must be logged in.');
    }
    return { user };
  })
);

export const userQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (user === undefined) {
      throw new ConvexError('User must be logged in.');
    }
    return { user };
  })
);

export const userAction = customAction(
  action,
  customCtx(async (ctx) => {
    const user: any = await ctx.runQuery(internal.user.internalGetUser, {});

    if (user === undefined) {
      throw new ConvexError('User must be logged in.');
    }
    return { user };
  })
);

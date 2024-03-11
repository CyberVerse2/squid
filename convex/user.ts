('use node');
import { v } from 'convex/values';
import { internalMutation, mutation, query } from './_generated/server';
import { Auth, GenericActionCtx } from 'convex/server';
import { ConvexError } from 'convex/values';
import { httpAction, internalQuery } from './_generated/server';
import { userMutation, userQuery, verifyWebhookPayload } from './utils';
import { internal } from './_generated/api';
import ENVIRONMENT from './environment';
import { App } from '@octokit/app';
import { Id } from './_generated/dataModel';
import { Buffer } from 'buffer';

const YOUR_APP_ID = 123456; // Replace with your GitHub App ID
const PRIVATE_KEY_BUFFER = `${ENVIRONMENT.GITHUB.PRIVATE_KEY}==`;
const key = Buffer.from(PRIVATE_KEY_BUFFER, 'base64').toString('ascii');
const app = new App({
  appId: YOUR_APP_ID,
  privateKey: key,
  webhooks: {
    secret: ENVIRONMENT.GITHUB.WEBHOOK_SECRET!
  }
});

export const internalGetUser = internalQuery({
  args: {},
  async handler(ctx, _) {
    await getUser(ctx, {});
  }
});

export const internalUpdateUser = internalMutation({
  args: {
    installationId: v.number()
  },
  async handler(ctx, { installationId }) {
    updateUser(ctx, { installationId });
  }
});

export const webhookHandler = httpAction(async (ctx, request) => {
  const body = await request.json();

  if (!verifyWebhookPayload(request as unknown as GenericActionCtx<any>, body)) {
    return new Response('Unauthorized', {
      status: 401
    });
  }
  const userId = await getUserId(ctx);

  if (userId === undefined) {
    throw new ConvexError('User must be logged in.');
  }

  app.webhooks.on('installation', async ({ octokit, payload }) => {
    const { installation } = payload;
    await ctx.runMutation(internal.user.internalUpdateUser, {
      installationId: installation.id
    });
    return new Response(`Installation Successful with id`, {
      status: 200
    });
  });
  return new Response(`Webhook Recieved`, {
    status: 200
  });
});

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    profileImg: v.string()
  },
  async handler(ctx, args) {
    const user = await ctx.db.insert('users', args);
  }
});

export const getUser = userQuery({
  args: {},
  async handler(ctx) {
    return await ctx.db.get(ctx.userId as Id<'users'>);
  }
});

export async function getUserId(ctx: { auth: Auth }) {
  const authInfo = await ctx.auth.getUserIdentity();
  return authInfo?.tokenIdentifier;
}

export const updateUser = userMutation({
  args: {
    installationId: v.number()
  },
  async handler(ctx, { installationId }) {
    await ctx.db.patch(ctx.userId as Id<'users'>, { installationId });
  }
});

import ENVIRONMENT from './environment';
import { action, internalAction } from './_generated/server';
import { v } from 'convex/values';
import { httpAction } from './_generated/server';
import { GenericActionCtx } from 'convex/server';
import { getUserId, verifyWebhookPayload } from './utils';
import { ConvexError } from 'convex/values';
import { internal } from './_generated/api';
import { App } from 'octokit';

export const webhookHandler = httpAction(async (ctx, request) => {
  const body = await request.json();
  const { action, installation } = body;
  console.log(action, installation);

  switch (action) {
    case 'created':
      console.log('created');
      await handleInstallationCreated(ctx, installation, installation.account.login);
  }

  return new Response(`Webhook Recieved`, {
    status: 200
  });
});

export const getUserToken = action({
  args: {
    code: v.string()
  },
  async handler(ctx, { code }) {
    try {
      return await fetch(
        `https://github.com/login/oauth/access_token?client_id=${ENVIRONMENT.GITHUB.CLIENT_ID}&client_secret=${ENVIRONMENT.GITHUB.CLIENT_SECRET}&code=${code}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json'
          }
        }
      )
        .then((response) => response.json())
        .then((data) => data);
    } catch (error) {
      throw new Error(`Fetching Access token failed with error ${error}`);
    }
  }
});

export async function handleInstallationCreated(
  ctx: GenericActionCtx<any>,
  installation: any,
  nickname: string
) {
  console.log('THIS ACTIVATED');
  console.log(nickname, installation);
  await ctx.runMutation(internal.user.internalUpdateUser, {
    nickname,
    installationId: installation.id
  });
  return new Response(`Installation Successful with id`, {
    status: 200
  });
}

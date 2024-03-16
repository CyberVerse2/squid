('use node');
import { httpAction } from './_generated/server';
import { GenericActionCtx } from 'convex/server';
import { getUserId, verifyWebhookPayload } from './utils';
import { ConvexError } from 'convex/values';
import { Buffer } from 'buffer';
import ENVIRONMENT from './environment';
import { internal } from './_generated/api';
import { App } from 'octokit';

// const YOUR_APP_ID = 851970;
// const PRIVATE_KEY_BUFFER = `${ENVIRONMENT.GITHUB.PRIVATE_KEY}==`;
// const key = Buffer.from(PRIVATE_KEY_BUFFER, 'base64').toString('ascii');

// const app = new App({
//   appId: YOUR_APP_ID,
//   privateKey: key,
//   webhooks: {
//     secret: ENVIRONMENT.GITHUB.WEBHOOK_SECRET!
//   }
// });

export const webhookHandler = httpAction(async (ctx, request) => {
  const body = await request.json();
  const { action, installation } = body;
  console.log(action, installation)

  // const headers = request.headers;

  // const isWebhookValid = await verifyWebhookPayload(ctx, { headers, body: request.body });
  // console.log(isWebhookValid);

  // if (!isWebhookValid) {
  //   throw new ConvexError('The webhook is invalid');
  // }
console.log(action)
  switch (action) {
    case 'created':
      console.log('created')
      await handleInstallationCreated(ctx, installation, installation.account.login);
  }

  return new Response(`Webhook Recieved`, {
    status: 200
  });
});

export async function handleInstallationCreated(
  ctx: GenericActionCtx<any>,
  installation: any,
  nickname: string
) {
  console.log('THIS ACTIVATED')
  console.log(nickname, installation)
  await ctx.runMutation(internal.user.internalUpdateUser, {
    nickname,
    installationId: installation.id
  });
  return new Response(`Installation Successful with id`, {
    status: 200
  });
}
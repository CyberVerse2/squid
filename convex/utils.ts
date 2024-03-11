import { action, mutation, query } from './_generated/server';
import ENVIRONMENT from './environment';
import {
  customAction,
  customCtx,
  customMutation,
  customQuery
} from 'convex-helpers/server/customFunctions';
import { ConvexError, v } from 'convex/values';
import { getUserId } from './user';

export const verifyWebhookPayload = action({
  args: { req: v.optional(v.any()), payload: v.string() },
  handler: async (_, { req, payload }) => {
    const encoder = new TextEncoder();
    const secret = encoder.encode(ENVIRONMENT.GITHUB.WEBHOOK_SECRET);
    const payloadBytes = encoder.encode(payload);
    const receivedSignature = req.headers['x-hub-signature'];

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secret,
      { name: 'HMAC', hash: 'SHA-1' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, payloadBytes);

    const calculatedSignature = `sha1=${Array.from(new Uint8Array(signature), (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('')}`;

    const expectedSignature = `sha1=${receivedSignature}`;

    return calculatedSignature === expectedSignature;
  }
});

export const userMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const userId = await getUserId(ctx);
    if (userId === undefined) {
      throw new ConvexError('User must be logged in.');
    }
    return { userId };
  })
);

export const userQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx)
    };
  })
);

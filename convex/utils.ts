import { QueryCtx, action, httpAction, mutation, query } from './_generated/server';
import ENVIRONMENT from './environment';
import { customMutation, customCtx, customQuery } from 'convex-helpers/server/customFunctions';
import { ConvexError, v } from 'convex/values';
import { Auth } from 'convex/server';

export const verifyWebhookPayload = action({
  args: { headers: v.optional(v.any()), body: v.string() },
  handler: async (_, { headers, body }) => {
    const header = new Headers(headers);
    const encoder = new TextEncoder();
    const secret = encoder.encode(ENVIRONMENT.GITHUB.WEBHOOK_SECRET);
    const payloadBytes = encoder.encode(body);
    const receivedSignature = header.get('x-hub-signature-256');

    if (!receivedSignature) {
      return false; // Signature not found in headers
    }

    // Extracting algorithm and signature from received signature
    const [algorithm, receivedHash] = receivedSignature.split('=');

    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      secret,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, payloadBytes);

    // Convert the signature bytes to hexadecimal representation
    const calculatedHash = Array.from(new Uint8Array(signature), (byte) => {
      return byte.toString(16).padStart(2, '0');
    }).join('');

    const expectedHash = receivedHash.toLowerCase();
    console.log(calculatedHash, expectedHash, secret);

    // Perform constant-time string comparison
    const hashesMatch = secureStringCompare(calculatedHash, expectedHash);

    return hashesMatch;
  }
});

// Custom secure string comparison function
function secureStringCompare(a:string, b: string) {
  if (a.length !== b.length) {
    return false;
  }
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}



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

export async function getUserId(ctx: { auth: Auth }) {
  const authInfo = await ctx.auth.getUserIdentity();
  return authInfo?.tokenIdentifier;
}

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
  if (!user) {
    return {
      cause: { type: 'NOT_FOUND' }
    };
  }
  return user;
};

export const userQuery = customQuery(
  query,
  customCtx(async (ctx) => {
    return {
      userId: await getUserId(ctx)
    };
  })
);

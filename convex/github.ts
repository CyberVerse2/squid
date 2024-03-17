'use node';
import ENVIRONMENT from './environment';
import { action } from './_generated/server';
import { v } from 'convex/values';
import { httpAction } from './_generated/server';
import { GenericActionCtx } from 'convex/server';
import { getUserId, userAction, verifyWebhookPayload } from './utils';
import { ConvexError } from 'convex/values';
import { internal } from './_generated/api';
import { App, Octokit } from 'octokit';




export const getIssues = userAction({
  args: {
    githubUsername: v.string(),
    installationId: v.number(),
    state: v.union(v.literal('open'), v.literal('closed'), v.literal('all'))
  },

  async handler(ctx, args) {
    try {
      const userToken = ctx.user.accessToken
      const octokit = new Octokit({
        auth: userToken
      });
      const issues = await octokit.rest.issues.listForAuthenticatedUser({
        filter: 'all',
        state: 'closed',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });
      return issues.data;
    } catch (error) {
      throw error;
      // console.error(`Error getting closed issues for ${githubUsername}: ${error}`);
    }
  }
});

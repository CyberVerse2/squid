'use node';
import { v } from 'convex/values';
import { Octokit } from 'octokit';
import { userAction } from './utils';

export const getIssues = userAction({
  args: {
    state: v.optional(v.union(v.literal('open'), v.literal('closed'), v.literal('all')))
  },
  async handler(ctx, { state }) {
    try {
      const userToken = ctx.user.accessToken;
      console.log(ctx.user.accessToken);
      const octokit = new Octokit({
        auth: userToken
      });
      const issues = await octokit.rest.issues.listForAuthenticatedUser({
        filter: 'all',
        per_page: 100,
        state: state as 'open' | 'closed' | 'all',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      return issues.data;
    } catch (error) {
      console.error(`Error getting closed issues for ${ctx.user.githubUsername}: ${error}`);
    }
  }
});

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

export const createIssue = userAction({
  args: {
    title: v.string(),
    body: v.string(),
    repository: v.string(),
    assignees: v.optional(v.array(v.string())),
    milestone: v.optional(v.number()),
    labels: v.optional(v.array(v.string()))
  },
  async handler(ctx, { title, body, repository, assignees, labels }) {
    try {
      const userToken = ctx.user.accessToken;
      const octokit = new Octokit({
        auth: userToken
      });
      const issue = await octokit.rest.issues.create({
        owner: ctx.user.githubUsername,
        repo: repository,
        title,
        body,
        labels,
        [`${assignees.length > 1 ? 'assignees' : 'assignee'}`]: assignees,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      return issue.data;
    } catch (error) {
      console.error(`Error creating issue for ${ctx.user.githubUsername}: ${error}`);
    }
  }
});


export const getIssuesAndComments = userAction({
  args: {
    state: v.optional(v.union(v.literal('open'), v.literal('closed'), v.literal('all')))
  },
  async handler(ctx, { state }) {
    try {
      const userToken = ctx.user.accessToken;
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

      const issuesData = issues.data;
      const comments = await Promise.all(
        issuesData.map(async (issue) => {
          const comments = await octokit.rest.issues.listComments({
            issue_number: issue.number,
            owner: ctx.user.githubUsername,
            repo: issue.repository.name,
            headers: {
              'X-GitHub-Api-Version': '2022-11-28'
            }
          });
          return comments.data;
        })
      );

      return { issues: issuesData, comments };
    } catch (error) {
      console.error(`Error getting closed issues for ${ctx.user.githubUsername}: ${error}`);
    }
  }
});
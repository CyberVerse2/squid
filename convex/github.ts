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

export const getIssueComments = userAction({
  args: {
    issueNumber: v.number(),
    repo: v.string()
  },
  async handler(ctx, { repo, issueNumber }) {
    try {
      const userToken = ctx.user.accessToken;
      const octokit = new Octokit({
        auth: userToken
      });
      const comments = await octokit.rest.issues.listComments({
        issue_number: issueNumber,
        owner: ctx.user.githubUsername,
        repo: repo,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      return comments.data;
    } catch (error) {
      console.error(
        `Error getting comments for issue ${issueNumber} for ${ctx.user.githubUsername}: ${error}`
      );
    }
  }
});

export const createIssueComment = userAction({ 
  args: {
    issueNumber: v.number(),
    repo: v.string(),
    body: v.string()
  },
  async handler(ctx, { issueNumber, repo, body }) {
    try {
      const userToken = ctx.user.accessToken;
      const octokit = new Octokit({
        auth: userToken
      });
      const comment = await octokit.rest.issues.createComment({
        issue_number: issueNumber,
        owner: ctx.user.githubUsername,
        repo: repo,
        body,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      return comment.data;
    } catch (error) {
      console.error(
        `Error creating comment for issue ${issueNumber} for ${ctx.user.githubUsername}: ${error}`
      );
    }
  }
});

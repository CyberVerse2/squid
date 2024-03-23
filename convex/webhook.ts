import ENVIRONMENT from './environment';
import { action, internalAction } from './_generated/server';
import { v } from 'convex/values';
import { httpAction } from './_generated/server';
import { GenericActionCtx } from 'convex/server';
import { ConvexError } from 'convex/values';
import { internal } from './_generated/api';
import { App } from 'octokit';

export const webhookHandler = httpAction(async (ctx, request) => {
  const body = await request.json();
  const { action } = body;

  switch (action) {
    case 'created':
      const { issue: commentsIssue, comment } = body;

      console.log('created');

      await handleCommentCreated(ctx, commentsIssue, comment);

    case 'opened':
      const { issue, repository } = body;

      console.log('opened');

      await handleIssueCreated(ctx, issue, repository);
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

export async function handleCommentCreated(ctx: GenericActionCtx<any>, issue: any, comment: any) {
  const existingIssue = await ctx.runQuery(internal.issues.getIssueByIssueIndex, {
    issueId: issue.id
  });
  const botUser = /\[bot\]$/;
  if (comment.issue_url === issue.url && !botUser.test(comment.user.login)) {
    console.log(comment);
    const newComment = await ctx.runMutation(internal.issues.internalCreateComment, {
      commentId: comment.id,
      body: comment.body,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
      url: comment.issue_url,
      user: {
        profilePic: comment.user.avatar_url,
        username: comment.user.login
      },
      issueId: existingIssue._id
    });
    console.log(newComment);
  } 
}

function mapAssignees(assignees) {
  return assignees.map((assignee) => ({
    id: assignee.id,
    username: assignee.login,
    url: assignee.url,
    profilePic: assignee.avatar_url,
    type: assignee.type
  }));
}

function mapLabels(labels) {
  return labels.map((label) => ({
    id: label.id,
    name: label.name,
    color: label.color,
    url: label.url
  }));
}

export async function handleIssueCreated(ctx: GenericActionCtx<any>, issue: any, repository: any) {
  const assignees = issue.assignees ? mapAssignees(issue.assignees) : [];
  const labels = issue.labels ? mapLabels(issue.labels) : [];

  const newIssue = await ctx.runMutation(internal.issues.internalCreateIssue, {
    issueId: issue.id,
    number: issue.number,
    state: issue.state,
    title: issue.title,
    body: issue.body,
    username: repository.owner.login.toLowerCase(),
    repositoryName: repository.full_name,
    issueCreator: {
      profilePic: issue.user.avatar_url,
      username: issue.user.login
    },
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
    url: issue.url,
    assignees,
    labels
  });

  return newIssue;
}

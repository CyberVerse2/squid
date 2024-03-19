import { Fragment, useState, useEffect } from 'react';
import { useAction, useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useShowChat } from '../providers/ShowChatProvider';


export function ChatHeader() {
  const { isAuthenticated } = useConvexAuth();
  const { showChat } = useShowChat();
  const updateUserAccessToken = useMutation(api.user.updateUserAccessToken);
  const user = useQuery(api.user.getUser);
  const getUserToken = useAction(api.webhook.getUserToken);
  const createIssue = useMutation(api.issues.createIssue);
  const createComment = useMutation(api.issues.createComment);
  const getIssuesAndComments = useAction(api.github.getIssuesAndComments);
  const isUserConnected = isAuthenticated && user?.accessToken && user?.accessToken !== 'null';

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_CLIENT_ID}`
    );
  }

  function getCode() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('code');
  }

  function isBotString(string) {
    const pattern = /\[bot\]$/;
    return pattern.test(string);
  }

  async function storeAccessToken() {
    const codeParam = getCode();
    if (isAuthenticated) {
      if (codeParam) {
        const token = await getUserToken({ code: codeParam });
        if (token?.access_token) {
          updateUserAccessToken({ accessToken: token.access_token });
          const issuesAndComments = await getIssuesAndComments({ state: 'all' });
          const { issues, comments } = issuesAndComments;

          await Promise.all(
            issues.map(async (issue) => {
              if (!issue.pull_request && issue.body) {
                const assignees = issue.assignees
                  ? issue.assignees.map((assignee) => {
                      return {
                        id: assignee.id,
                        username: assignee.login,
                        url: assignee.url,
                        profilePic: assignee.avatar_url,
                        type: assignee.type
                      };
                    })
                  : [];
                const labels = issue.labels
                  ? issue.labels.map((label) => {
                      return {
                        id: label.id,
                        name: label.name,
                        color: label.color,
                        url: label.url
                      };
                    })
                  : [];

                const newIssue = await createIssue({
                  issueId: issue.id,
                  number: issue.number,
                  state: issue.state,
                  title: issue.title,
                  body: issue.body,
                  repositoryName: issue.repository.full_name,
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

                await Promise.all(
                  comments.map(async (comment) => {
                    comment.map(async (comment) => {
                      if (
                        comment &&
                        comment.issue_url === issue.url &&
                        !isBotString(comment.user.login)
                      ) {
                        console.log(comment);
                        await createComment({
                          issueId: newIssue.id,
                          url: comment.url,
                          body: comment.body,
                          commentId: comment.id,
                          user: {
                            profilePic: comment.user.avatar_url,
                            username: comment.user.login
                          },
                          createdAt: comment.created_at,
                          updatedAt: comment.updated_at
                        });
                      }
                    });
                  })
                );
              }
            })
          );

          console.log(issuesAndComments);
        } else if (token.error === 'bad_verification_code' && isUserConnected) {
          console.log(token);
          console.log(token.error === 'bad_verification_code', isUserConnected);
          updateUserAccessToken({ accessToken: 'null' });
        }
      }
    }
  }

  useEffect(() => {
    storeAccessToken();
  }, []);

  return (
    <>
      <header
        className={`${
          showChat && 'hidden '
        } lg:flex flex  items-center justify-between h-[10vh]  p-3 border-b border-gray-100`}
      >
        <h1 className="text-gray-600 font-bold text-2xl">Squid</h1>
        <div>
          <a
            href="#"
            onClick={isUserConnected ? () => null : loginWithGithub}
            className={`px-2.5 py-2 ${
              isUserConnected ? 'bg-white border border-messageColor' : 'bg-messageColor'
            } text-white flex items-center rounded-md  outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              className={`${isUserConnected ? 'fill-messageColor' : 'fill-white'}  mr-2`}
            >
              {' '}
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" />
            </svg>
            <p className={isUserConnected ? 'text-messageColor' : 'text-white'}>
              {isUserConnected ? 'Connected' : 'Connect'}
            </p>
          </a>
        </div>
      </header>
    </>
  );
}

import { Fragment, useState, useEffect } from 'react';
import { useAction, useConvexAuth, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useShowChat } from '../providers/ShowChatProvider';

function NewIssueModal({ setShowIssueModal }) {
  const [issueDetails, setIssueDetails] = useState({
    name: '',
    description: ''
  });
  const [repos, setRepos] = useState(['Repo1', 'Repo32']);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleCloseModal = () => {
    setShowIssueModal(false);
  };
  return (
    <Fragment>
      <div
        className="fixed bg-gray-400 opacity-20 h-screen w-[120%] m-0 top-0 left-0 z-10"
        onClick={handleCloseModal}
      />
      <form className="bg-white px-4 pb-4  w-[35%] rounded-md top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 fixed z-20">
        <div className="py-4">
          <h1 className="text-lg text-center text-gray-500 font-semibold">New Issue</h1>
          <span
            className="absolute  w-7 p-2 top-3 right-4 rounded-full bg-gray-400 cursor-pointer"
            onClick={handleCloseModal}
          >
            <img className=" invert brightness-0 w-full block" src="/icons/cancel.svg" alt="" />
          </span>
        </div>
        <div>
          <div className="">
            <label htmlFor="name" className="text-sm text-gray-400 mb-1 block">
              Name
            </label>
            <input
              value={issueDetails.name}
              name="name"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="h-10 border block w-full mb-5 rounded-md indent-2 text-sm text-gray-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm text-gray-400 mb-1 block">
              Repository
            </label>
            <select
              name="repo"
              onChange={handleChange}
              className="h-10 border block w-full mb-5 rounded-md text-sm text-gray-600 "
            >
              {repos.map((repo, index) => (
                <option className="indent-1 text-gray-300 text-sm" key={index}>
                  {repo}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="description" className="text-sm text-gray-400 mb-1 block">
              Description
            </label>
            <input
              value={issueDetails.description}
              name="description"
              onChange={handleChange}
              type="text"
              inputMode="text"
              className="indent-1 h-10 border block w-full mb-5 rounded-md text-gray-500 text-sm"
            />
          </div>
        </div>
        <button className="w-full bg-blue-500 font-bold text-white py-2 rounded-md cursor-pointer hover:bg-blue-400">
          Create Issue
        </button>
      </form>
    </Fragment>
  );
}

export function ChatHeader() {
  const [showIssueModal, setShowIssueModal] = useState(false);
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

  async function storeAccessToken() {
    const codeParam = getCode();
    if (isAuthenticated) {
      if (codeParam) {
        const token = await getUserToken({ code: codeParam });
        if (token?.access_token) {
          updateUserAccessToken({ accessToken: token.access_token });
          const issuesAndComments = await getIssuesAndComments({ state: 'all' });
          const { issues, comments } = issuesAndComments;
          issues.forEach((issue) => {
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

              createIssue({
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

              comments?.forEach(async (comment) => {
                comment.map(async (comment) => {
                  if (comment && comment.issue_url === issue.url)
                    await createComment({
                      issueId: issue.id,
                      url: comment.url,
                      body: comment.body,
                      commentId: comment.id,
                      createdAt: comment.created_at,
                      updatedAt: comment.updated_at
                    });
                });
              });
            }
          });
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
        {showIssueModal && <NewIssueModal setShowIssueModal={setShowIssueModal} />}
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

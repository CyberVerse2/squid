import { useEffect } from 'react';
import { Button } from '../general/components/button';
import { useAction, useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/clerk-react';

export function ChatHeader() {
  const updateUserOauthCode = useMutation(api.user.updateUserOauthCode);
  const updateUserAccessToken = useMutation(api.user.updateUserAccessToken);
  const user = useQuery(api.user.getUser);
  const getUserToken = useAction(api.webhook.getUserToken);
  const {
    user: { username }
  } = useUser();

  function loginWithGithub() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=Iv1.7526b5cfb937577e`
    );
  }
  useEffect(() => {
    async function shege() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get('code');
      if (username && codeParam) {
        updateUserOauthCode({ oauthCode: codeParam });
        if (user?.oauthCode) {
          const token = await getUserToken({ code: user.oauthCode });
          if (token?.access_token) {
            updateUserAccessToken({ accessToken: token.access_token });
          }
        }
      }
    }
    shege();
  }, [getUserToken, updateUserAccessToken, updateUserOauthCode, user?.oauthCode, username]);

  return (
    <>
      <div className="flex  items-center justify-between w-full">
        <header className="flex items-center justify-between space-x-4 p-3 border-b border-gray-100 w-4/5 ">
          <h1 className="font-bold text-2xl hidden md:block md:px-4">Squid</h1>
          <nav className="flex ml-4 md:ml-0">
            <input
              className="w-full md:w-[500px] text-sm outline-none border border-gray-200 rounded-md p-2"
              id="search"
              placeholder="Search issues, pull requests, and discussions"
            />
            <div className="flex items-center px-3">
              <Button size={'small'} text={'New issue'} />
            </div>
          </nav>
        </header>
        <div className="px-3.5">
          <a
            href="#"
            onClick={user?.oauthCode && user?.accessToken ? () => null : loginWithGithub}
            className={`px-2.5 py-2 ${
              user?.oauthCode && user?.accessToken
                ? 'bg-white border border-messageColor'
                : 'bg-messageColor'
            } text-white flex items-center rounded-md  outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              className={`${
                user?.oauthCode && user?.accessToken ? 'fill-messageColor' : 'fill-white'
              }  mr-2`}
            >
              {' '}
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6c0-0.4,0-0.9,0.2-1.3 C7.2,6.1,7.4,6,7.5,6c0,0,0.1,0,0.1,0C8.1,6.1,9.1,6.4,10,7.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3c0.9-0.9,2-1.2,2.5-1.3 c0,0,0.1,0,0.1,0c0.2,0,0.3,0.1,0.4,0.3C17,6.7,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4 c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3C22,6.1,16.9,1.4,10.9,2.1z" />
            </svg>
            <p
              className={user?.oauthCode && user?.accessToken ? 'text-messageColor' : 'text-white'}
            >
              {user?.oauthCode && user?.accessToken ? 'Connected' : 'Connect'}
            </p>
          </a>
        </div>
      </div>
    </>
  );
}

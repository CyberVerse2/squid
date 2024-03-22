import { useEffect, useRef } from 'react';
import { Message } from './message';
import { useUser } from '@clerk/clerk-react';
import { useCurrentIssue } from '../providers/IssueProvider';

export function MessageBox({ chat }) {
  const { user } = useUser();
  const { currentIssue } = useCurrentIssue();

  const messageContainer = useRef(null);

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [chat]);
  console.log(currentIssue)
  return currentIssue ? (
    <div
      ref={messageContainer}
      className={`py-2 flex-1 overflow-y-auto border-t border-gray-200`}
    >
      {currentIssue
        ? chat?.map((item) => (
            <Message
              key={item.commentId}
              username={item.user.username || ''}
              text={item.body || ''}
              imageSrc={item.imageSrc || ''}
              me={item.name === user.firstName}
              profilePic={item.user.profilePic}
            />
          ))
        : []}
    </div>
  ) : (
    <div
      ref={messageContainer}
      className="flex bg-gray-100 justify-center items-center w-full h-full text-2xl"
    >
      Your issue comments appear here.
    </div>
  );
}

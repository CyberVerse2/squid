import { useEffect, useRef } from 'react';
import { Message } from './message';
import { useUser } from '@clerk/clerk-react';
import { useShowChat } from '../providers/ShowChatProvider';
import { useCurrentIssue } from '../providers/IssueProvider';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function MessageBox({ chat }) {
  const { user } = useUser();
  const messageContainer = useRef(null);
  const { showChat } = useShowChat();
  const { currentIssue } = useCurrentIssue();
  const getIssueComments = useQuery(api.issues.getIssueComments);
  const getComments = currentIssue ? getIssueComments({ issueId: currentIssue?.id }) : null;
  console.log(getComments);

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [chat]);

  return currentIssue ? (
    <div ref={messageContainer} className={`py-2 flex-1 overflow-y-auto border-t border-gray-200`}>
      {chat.map((item, key) => (
        <Message
          key={key}
          username={item.name}
          text={item.message.text}
          imageSrc={item.message.imageSrc}
          me={item.name === user.firstName}
        />
      ))}
    </div>
  ) : (
    <div ref={messageContainer} className="text-center flex justify-center">
      Start a Chat
    </div>
  );
}

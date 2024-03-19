import { useEffect, useState } from 'react';
import { MessageBox } from './messageBox';
import { MessageInput } from './messageInput';
import { MessageProfile } from './messageProfile';
import { useShowChat } from '../providers/ShowChatProvider';
import { useCurrentIssue } from '../providers/IssueProvider';
import { useAction, useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export function MessageList() {
  const { currentIssue } = useCurrentIssue();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { showChat, setShowChat } = useShowChat();
  const createComment = useAction(api.github.createComment);
  const issueComments = useQuery(
    api.issues.getIssueComments,

    currentIssue?.url ? { issueId: currentIssue._id } : 'skip'
  );

  useEffect(() => {
    if (currentIssue?._id && issueComments) {
      setMessages(issueComments ? issueComments : []);
    }
  }, [currentIssue?._id, issueComments]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    console.log({
      issueId: currentIssue._id,
      body: newMessage,
      repository: currentIssue.repositoryName.split('/')[1],
      issueNumber: currentIssue.number
    });
    await createComment({
      issueId: currentIssue._id,
      body: newMessage,
      repository: currentIssue.repositoryName.split('/')[1],
      issueNumber: currentIssue.number
    });
    setNewMessage('');
  };
  return (
    <div
      className={` flex flex-col justify-between px-3 lg:flex-1  border-gray-200  flex-none absolute w-[95%] right-0 ${
        !showChat && 'translate-x-full'
      } lg:translate-x-0 duration-1000 transition-all lg:relative bg-white h-full`}
    >
      <MessageProfile />
      {showChat && (
        <div
          className="w-[.7rem] absolute h-[90vh] sm:hidden bg-white top-0 -left-[5%] border border-gray-200"
          onClick={() => setShowChat(false)}
        >
          <span className="rounded-full bg-white absolute top-3 left-0 p-1 border border-gray-200  w-7 h-7 ">
            <img className="block  w-full opacity-45" src="/icons/arrow.svg" alt="arrow" />
          </span>
        </div>
      )}
      <MessageBox chat={messages} />
      <MessageInput
        setNewMessage={setNewMessage}
        newMessage={newMessage}
        handleSubmit={handleSumbit}
      />
    </div>
  );
}

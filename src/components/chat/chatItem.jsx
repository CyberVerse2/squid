import { useQuery } from 'convex/react';
import { Label } from '../general/components/label';
import { IssueClosed, IssueOpened } from '../general/icons/issue';
import { useShowChat } from '../providers/ShowChatProvider';
import { api } from '../../../convex/_generated/api';
import { useCurrentIssue } from '../providers/IssueProvider';
import { getElapsedTimeDescription } from '../../utils/getTimeElapsed';

export function ChatItem({ issue }) {
  const { setShowChat } = useShowChat();
  const { setCurrentIssue } = useCurrentIssue();
  const getIssue = useQuery(api.issues.getIssue, { issueId: issue._id });
  const issueComments = useQuery(api.issues.getIssueComments, { issueId: issue._id });
  console.log(issueComments);
  const handleShowChat = () => {
    setShowChat(true);
  };

  async function handleClickIssue() {
    handleShowChat();
    setCurrentIssue(getIssue);
  }

  return (
    <div
      onClick={handleClickIssue}
      className=" active:bg-chatColor hover:bg-chatColor transition-colors flex  rounded-md "
    >
      <div className="flex flex-col justify-between w-full p-2 flex-start">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {issue.state === 'open' ? <IssueOpened /> : <IssueClosed />}
            <h3 className="p-1 summarized">{issue.repositoryName}</h3>
          </div>
          <p className=" fill-previewMessageColor text-[0.6em]">
            {getElapsedTimeDescription(issue.updatedAt)}
          </p>
        </div>
        <p className="p-1 text-[0.7rem] ">{issue.title}</p>
        <div className="flex py-2 w-full">
          {issue.labels.map((label) => {
            return <Label key={label.id} color={label.color} text={label.name} />;
          })}
          <Label color={'gray-200'} text={`${0} comment${issueComments?.length > 1 ? 's' : ''}`} />
        </div>
      </div>
    </div>
  );
}

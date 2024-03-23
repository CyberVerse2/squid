import Markdown from 'react-markdown';
import { getElapsedTimeDescription } from '../../utils/getTimeElapsed';
import { Label } from '../general/components/label';
import { IssueOpened } from '../general/icons/issue';
import { useCurrentIssue } from '../providers/IssueProvider';

export function MessageProfile() {
  const { currentIssue } = useCurrentIssue();
  return currentIssue ? (
    <div className="flex items-center py-4 ">
      <div className=" flex flex-col">
        <div className="flex">
          <span className="flex items-center">
            <IssueOpened />
            <h3 className="pl-1">{currentIssue.title}</h3>
          </span>
          <h3 className="pl-1 text-gray-500"> # {currentIssue.number}</h3>
        </div>
        <h2 className="pt-4 text-[1.15rem]">
          <Markdown>{currentIssue.body}</Markdown>
        </h2>
        <div className="flex flex-col py-1 ">
          <div className="flex py-2 w-full">
            {currentIssue.labels.map((label) => {
              return <Label key={label.id} color={label.color} text={label.name} />;
            })}
          </div>
          <div className="flex">
            <p className="pr-2">
              Celestine opened this issue {getElapsedTimeDescription(currentIssue.updatedAt)} ago.
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}

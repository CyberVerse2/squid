import { Label } from '../general/components/label';
import { IssueOpened } from '../general/icons/issue';

export function MessageProfile() {
  return (
    <div className="flex items-center  py-2">
      <div className="px-3 flex flex-col">
        <div className="flex">
          <span className='flex items-center'>
            <IssueOpened />
            <h3 className='pl-1'>Add Typescript Template</h3>
          </span>
          <h3 className="pl-1 text-gray-500"> #1</h3>
        </div>
        <div className="flex flex-col py-1 ">
          <div className="flex py-2 w-full">
            <Label color="neutral" text="2 comments" />
            <Label color="help" text="Help wanted" />
            <Label color="bug" text="bug" />
          </div>
          <div className="flex">
            <p className="pr-2">Celestine opened this issue 5 days ago.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

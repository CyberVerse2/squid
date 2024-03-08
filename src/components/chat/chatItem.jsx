import { Label } from '../general/components/label';
import { IssueClosed, IssueOpened } from '../general/icons/issue';

export function ChatItem() {
  return (
    <div className=" hover:bg-chatColor transition-colors flex  rounded-md ">
      <div className="flex flex-col justify-between w-full p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <IssueOpened />
            <h3 className="p-1">JCCoder/startease</h3>
          </div>
          <p className=" fill-previewMessageColor text-[0.6em]">7d</p>
        </div>
        <p className="p-1 text-[0.7rem]">Typescript template needed</p>
        <div className="flex py-2 w-full">
          <Label color="help" text="Help wanted" />
          <Label color="bug" text="bug" />
          <Label color="neutral" text="2 comments" />
          <Label color="neutral" text="neutral" />
          <Label color="neutral" text="docs" />
        </div>
      </div>
    </div>
  );
}

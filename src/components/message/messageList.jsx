import { MessageBox } from './messageBox';
import { MessageProfile } from './messageProfile';

export function MessageList() {
  return (
    <div className="col-span-4 px-3 py-2 border-t border-gray-200 max-h-[100vh]">
      <MessageProfile />
      <MessageBox />
    </div>
  );
}

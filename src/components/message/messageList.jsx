import { MessageBox } from './messageBox';
import { MessageInput } from './messageInput';
import { MessageProfile } from './messageProfile';

export function MessageList() {
  return (
    <div className="col-span-5 px-3 pt-2 border-t border-gray-200">
      <MessageProfile />
      <MessageBox />
      <MessageInput />
    </div>
  );
}


import { ChatList } from '../components/chat/chat';
import { MessageList } from '../components/message/messageList';
import { Sidebar } from '../components/sidebar/sidebar';

export function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className=" grid grid-cols-6 w-full">
        <ChatList />
        <MessageList />
      </div>
    </div>
  );
}

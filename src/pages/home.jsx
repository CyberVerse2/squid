import { ChatList } from '../components/chat/chat';
import { ChatHeader } from '../components/chat/header';
import { MessageList } from '../components/message/messageList';
import { Sidebar } from '../components/sidebar/sidebar';

export function Home({openModal}) {
  return (
    <div className="flex w-full max-h-[100vh]">
      <Sidebar openModal={openModal}/>
      <div className="w-full">
        <ChatHeader />
        <div className="grid grid-cols-7 w-full ">
          <ChatList />
          <MessageList />
        </div>
      </div>
    </div>
  );
}

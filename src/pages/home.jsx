import { useEffect, useState } from 'react';
import { ChatList } from '../components/chat/chat';
import { ChatHeader } from '../components/chat/header';
import { MessageList } from '../components/message/messageList';
import { Sidebar } from '../components/sidebar/sidebar';
import Modal from '../components/general/components/modal';

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full max-h-[100vh]">
      <Sidebar openModal={() => setIsOpen(true)} />
      <div className="w-full">
        <ChatHeader />
        <div className="grid grid-cols-7 w-full ">
          <ChatList />
          <MessageList />
        </div>
      </div>
      { isOpen && <Modal closeModal={() => setIsOpen(false)} />}
    </div>
  );
}

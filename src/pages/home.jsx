import { useEffect, useState } from 'react';
import { ChatList } from '../components/chat/chat';
import { ChatHeader } from '../components/chat/header';
import { MessageList } from '../components/message/messageList';
import { Sidebar } from '../components/sidebar/sidebar';
import Modal from '../components/general/components/modal';

export function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex w-full ">
      <Sidebar openModal={() => setIsOpen(true)} />
      <div className="w-full h-screen">
        <ChatHeader />
        <div className="flex relative h-screen justify-between overflow-x-hidden">
          <ChatList />
          <MessageList />
        </div>
      </div>
      {isOpen && <Modal closeModal={() => setIsOpen(false)} />}
    </div>
  );
}

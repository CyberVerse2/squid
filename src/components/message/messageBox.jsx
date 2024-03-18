import { useEffect, useRef } from 'react';
import { Message } from './message';
import { useUser } from '@clerk/clerk-react';

export function MessageBox({ chat }) {
  const { user } = useUser();
  const messageContainer = useRef(null);

  useEffect(() => {
    messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
  }, [chat]);

  return (
    <div
      ref={messageContainer}
      className="py-2 overflow-scroll border-t border-gray-200 h-[65.5vh]"
    >
      {chat.map((item, index) => (
        <Message
          key={index}
          username={item.name}
          text={item.message.text}
          imageSrc={item.message.imageSrc}
          me={item.name == user.firstName}
        />
      ))}
    </div>
  );
}

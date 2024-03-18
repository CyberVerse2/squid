import { useEffect, useRef } from 'react';
import { Message } from './message';
import { useUser } from '@clerk/clerk-react';
import { useShowChat } from '../providers/ShowChatProvider';

export function MessageBox({ chat }) {
	const { user } = useUser();
	const messageContainer = useRef(null);
	const {showChat} = useShowChat();

	useEffect(() => {
		messageContainer.current.scrollTop =
			messageContainer.current.scrollHeight;
	}, [chat]);

	return (
		<div
			ref={messageContainer}
			className={`py-2 max-h-screen   border-t border-gray-200`}
		>
			{chat.map((item, key) => (
				<Message
					key={key}
					username={item.name}
					text={item.message.text}
					imageSrc={item.message.imageSrc}
					me={item.name == user.firstName}
				/>
			))}
		</div>
	);
}

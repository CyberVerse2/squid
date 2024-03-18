import { useState } from 'react';
import { MessageBox } from './messageBox';
import { MessageInput } from './messageInput';
import { MessageProfile } from './messageProfile';
import { useUser } from '@clerk/clerk-react';
import { useShowChat } from '../providers/ShowChatProvider';

const userChat = [
	{ name: 'Angelina', message: { text: 'Hello, I need help.' } },
	{ name: 'Michael', message: { text: 'Hi there!' } },
	{ name: 'Emma', message: { text: "Hey, what's up?" } },
	{ name: 'James', message: { text: 'Not much, just chilling.' } },
	{ name: 'Sophia', message: { text: 'Nice weather today!' } },
	{ name: 'William', message: { text: "Yes, it's lovely outside." } },
	{
		name: 'Olivia',
		message: { text: 'What are your plans for the weekend?' },
	},
	{
		name: 'Alexander',
		message: { text: "I'm thinking of going for a hike." },
	},
	{ name: 'Ava', message: { text: 'That sounds fun! Enjoy your hike.' } },
	{ name: 'Ethan', message: { text: 'Thanks, I will!' } },
];

export function MessageList() {
	const { user } = useUser();
	const [messages, setMessages] = useState(userChat);
	const [newMessage, setNewMessage] = useState({ text: '', imageSrc: '' });
	const {showChat} = useShowChat();

	const handleSumbit = (e) => {
		e.preventDefault();
		setMessages((prev) => [
			...prev,
			{ name: user.firstName, message: newMessage },
		]);
		setNewMessage({ text: '', imageSrc: '' });
	};
	return (
		<div className={` flex flex-col justify-between px-3 lg:flex-1  border-gray-200  flex-none absolute lg:relative bg-white `}>
			<MessageProfile />
			<MessageBox chat={messages} />

			<MessageInput
				setNewMessage={setNewMessage}
				newMessage={newMessage}
				handleSubmit={handleSumbit}
			/>
		</div>
	);
}

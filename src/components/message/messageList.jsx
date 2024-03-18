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
	const {showChat, setShowChat} = useShowChat();

	const handleSumbit = (e) => {
		e.preventDefault();
		setMessages((prev) => [
			...prev,
			{ name: user.firstName, message: newMessage },
		]);
		setNewMessage({ text: '', imageSrc: '' });
	};
	return (
		<div className={` flex flex-col justify-between px-3 lg:flex-1  border-gray-200  flex-none absolute w-[95%] right-0 ${!showChat && "translate-x-full"} lg:translate-x-0 duration-1000 transition-all lg:relative bg-white h-full`}>
			<MessageProfile />
			{showChat && <div className='w-[.7rem] absolute h-[90vh] sm:hidden bg-white top-0 -left-[5%] border border-gray-200' onClick={()=>setShowChat(false)}>
				<span className='rounded-full bg-white absolute top-3 left-0 p-1 border border-gray-200  w-7 h-7 '>
					<img className='block  w-full opacity-45' src="/icons/arrow.svg" alt="arrow" />
				</span>
			</div>}

			<MessageBox chat={messages} />

			<MessageInput
				setNewMessage={setNewMessage}
				newMessage={newMessage}
				handleSubmit={handleSumbit}
			/>
		</div>
	);
}

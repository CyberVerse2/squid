import { ChatItem } from './chatItem';

let render = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export function ChatList() {
	return (
		<div className="lg:w-[30%] w-full  overflow-y-auto p-4 border-r-gray-200">
			{render.map((item) => {
				return <ChatItem key={item} />;
			})}
		</div>
	);
}

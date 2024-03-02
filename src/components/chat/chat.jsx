import { ChatItem } from './chatItem';
import { ChatHeader } from './header';

let render = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export function ChatList() {
  return (
    <div className=" col-span-2 flex overflow-y-auto h-[100vh] border-r border-gray-200">
      <div className=" px-3 py-2  w-full ">
        <ChatHeader />
        {render.map((item) => {
          return <ChatItem key={item} />;
        })}
      </div>
    </div>
  );
}

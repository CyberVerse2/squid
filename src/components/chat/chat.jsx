import { ChatItem } from './chatItem';

let render = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export function ChatList() {

  return (
    <div className=" col-span-7 sm:col-span-2 flex overflow-y-auto h-[91vh] border border-r border-t border-gray-200">
      <div className=" px-3 py-2  w-full ">
        {render.map((item) => {
          return <ChatItem key={item} />;
        })}
      </div>
    </div>
  );
}

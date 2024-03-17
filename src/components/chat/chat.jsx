import { ChatItem } from './chatItem';

let render = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export function ChatList() {

  return (
    <div className=" overflow-y-auto w-[35%] flex flex-col border-r border-r-gray-200">
      <div className='flex text-center  items-center justify-center h-14 border-b border-b-gray-100 '>
        Issues
      </div>
      <div className="flex-1 overflow-y-auto ">
        {render.map((item) => {
          return <ChatItem key={item} />;
        })}
      </div>
    </div>
  );
}

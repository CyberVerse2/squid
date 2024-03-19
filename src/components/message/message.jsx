import Markdown from 'react-markdown';

const isNotFirstMessage = false;
const isUser = false;

export function Message({ username, text, me, imageSrc, profilePic }) {
  return (
    <div className={`flex items-end my-2 ${me && 'justify-end'}`}>
      {isNotFirstMessage || (
        <img src={profilePic} alt="" className={`w-10 rounded-md px-2 ${me && 'order-2'}`} />
      )}

      <div
        className={` ${isUser ? 'bg-messageColor' : 'bg-[#f1f1f1]'} rounded-md p-2${
          isNotFirstMessage ? 'ml-8' : ''
        }`}
      >
        <p className=" text-messageColor text-[0.68rem]">{username}</p>
        {imageSrc && <img className="w-full object-cover h-16 my-2 rounded-md" src={imageSrc} />}
        <div className="text-sm font-inter text-gray-800">
          <Markdown>{text}</Markdown>
        </div>
      </div>
    </div>
  );
}

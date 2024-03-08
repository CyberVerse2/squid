import FormattedText from '../../utils/formatText';

const isNotFirstMessage = false;
const isUser =false

export function Message({username, text }) {
  return (
    <div className="flex items-center my-2">
      {isNotFirstMessage || <img src="/profile.png" alt="" className="w-10 rounded-md px-2" />}

      <div
        className={` ${isUser ? 'bg-messageColor' : 'bg-[#f1f1f1]'} rounded-md p-2${
          isNotFirstMessage ? 'ml-8' : ''
        }`}
      >
        <p className=" text-messageColor text-[0.68rem]">{username}</p>
        <FormattedText text={text} />
      </div>
    </div>
  );
}

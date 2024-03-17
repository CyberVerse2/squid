import FormattedText from '../../utils/formatText';

const isNotFirstMessage = false;
const isUser =false

export function Message({username, text, me, imageSrc }) {
  
  return (
    <div className={`flex items-end my-2 ${me &&"justify-end"}`}>
      {isNotFirstMessage || <img src="/profile.png" alt="" className={`w-10 rounded-md px-2 ${me && "order-2"}`} />}

      <div
        className={` ${isUser ? 'bg-messageColor' : 'bg-[#f1f1f1]'} rounded-md p-2${
          isNotFirstMessage ? 'ml-8' : ''
        }`}
      >
        <p className=" text-messageColor text-[0.68rem]">{username}</p>
        {imageSrc && <img className='w-full object-cover h-16 my-2 rounded-md' src={imageSrc} />}
        <FormattedText text={text} />
      </div>
    </div>
  );
}

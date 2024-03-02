const isNotFirstMessage = false;

export function Message() {
  return (
    <div className="flex items-center">
      {isNotFirstMessage || <img src="/profile.png" alt="" className="w-10 rounded-md px-2" />}
      <div className={` bg-messageColor rounded-md ${isNotFirstMessage ? 'ml-8' : ''}`}>
        <p className="text-white p-2">How are you?</p>
      </div>
    </div>
  );
}

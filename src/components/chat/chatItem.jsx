export function ChatItem() {
  return (
    <div className=" hover:bg-chatColor transition-colors flex p-2 m-2 rounded-md ">
      <img
        src="/profile.png"
        className=" w-12 h-12 rounded-md"
        alt="Proifle image"
      />
      <div className=" px-2 py-2 flex flex-col justify-between w-full">
        <div className="flex items-center justify-between">
          <h3>John Doe</h3>
          <p className=" fill-previewMessageColor">15m</p>
        </div>
        <p>Haha, that is really amazing...</p>
      </div>
    </div>
  );
}

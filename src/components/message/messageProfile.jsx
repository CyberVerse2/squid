
export function MessageProfile() {
  return (
 <div className="flex items-center border-b border-gray-200 py-2">
      <img src="/profile.png " alt="" className="w-9 mx-2" />
      <div className="px-3 flex flex-col">
        <h3>John Doe</h3>
        <p className=" text-xs"> Online</p>
      </div>
    </div>
  );
}

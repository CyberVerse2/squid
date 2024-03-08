import { Button } from '../general/components/button';

export function ChatHeader() {
  return (
    <>
      <div className="flex  items-center justify-between w-full">
        <header className="flex items-center justify-between space-x-4 p-3 border-b border-gray-100 w-4/5 ">
        <h1 className="font-bold text-2xl hidden md:block md:px-4">Squid</h1>
          <nav className="flex ml-4 md:ml-0"> 
              <input
                className="w-full md:w-[500px] text-sm outline-none border border-gray-200 rounded-md p-2"
                id="search"
                placeholder="Search issues, pull requests, and discussions"
              />
          <div className="flex items-center px-3">
              <Button size={'small'} text={'New issue'} />
          </div>
          </nav>
        </header>
      </div>
    </>
  );
}
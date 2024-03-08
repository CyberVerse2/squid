export function MessageInput() {
    const tx = document.querySelectorAll('textarea');
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;');
      tx[i].addEventListener('input', onInput, false);
    }
    function onInput() {
      this.style.height = 'auto';
      this.style.height = this.scrollHeight + 'px';
    }
  return (
    <div className=" px-3 py-2 flex items-end justify-between max-h-[4rem] h-screen">
      <a href="#" className="p-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.97 12V15.5C11.97 17.43 13.54 19 15.47 19C17.4 19 18.97 17.43 18.97 15.5V10C18.97 6.13 15.84 3 11.97 3C8.1 3 4.97 6.13 4.97 10V16C4.97 19.31 7.66 22 10.97 22"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
      <div className="flex items-center rounded-md border-2 border-gray-200 w-[93%]">
        <textarea
          type="text"
          className="w-full px-3 py-2  rounded-md focus:outline-none text-sm max-h-11 resize-none overflow-auto"
          rows={1}
          placeholder="Type a message"
        ></textarea>
        <a className="ml-2  text-white px-3 py-2 ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.14 2.96001L7.11 5.96001C1.04 7.99001 1.04 11.3 7.11 13.32L9.79 14.21L10.68 16.89C12.7 22.96 16.02 22.96 18.04 16.89L21.05 7.87001C22.39 3.82001 20.19 1.61001 16.14 2.96001ZM16.46 8.34001L12.66 12.16C12.51 12.31 12.32 12.38 12.13 12.38C11.94 12.38 11.75 12.31 11.6 12.16C11.4605 12.0189 11.3823 11.8284 11.3823 11.63C11.3823 11.4316 11.4605 11.2412 11.6 11.1L15.4 7.28001C15.69 6.99001 16.17 6.99001 16.46 7.28001C16.75 7.57001 16.75 8.05001 16.46 8.34001Z"
              fill="#615EF0"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

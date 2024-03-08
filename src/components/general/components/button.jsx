export function Button({ size, text }) {
  let buttonStyle = '';

  if (size === 'small') {
    buttonStyle = ' px-3 py-2';
  } else if (size === 'medium') {
    buttonStyle = ' px-5 py-4';
  } else if (size === 'large') {
    buttonStyle = ' px-7 py-6';
  } else {
    buttonStyle = ' px-3 py-2';
  }

  return (
    <button
      className={`
         ${buttonStyle} bg-messageColor text-white  rounded-md border-none outline-none`}
    >
      <p className='text-white'>{text}</p>
    </button>
  );
}

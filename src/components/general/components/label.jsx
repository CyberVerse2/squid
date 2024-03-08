

export function Label({ color, text }) {
  let buttonStyle = '';

  if (color === 'neutral') {
    buttonStyle = 'bg-gray-100';
  } else if (color === 'help') {
    buttonStyle = ' bg-green-100';
  } else if (color === 'bug') {
    buttonStyle = 'bg-orange-100';
  } else {
    buttonStyle = ' ';
  }

  return (
    <button
      className={`
         ${buttonStyle} mr-1 px-2 text-white rounded-md border-none`}
    >
      <p className={`text-${buttonStyle.split('-')[0]} text-[0.6rem]`}>{text}</p>
    </button>
  );
}



export function Label({ color, text }) {
  return (
      <a className={` mr-1 px-2  rounded-md border-none`} style={{ backgroundColor: `#${color}` }}>
        <p className={`text-[0.6rem]`} style={{ color: `${color}` }}>
          {text}
        </p>
      </a>
  );
}

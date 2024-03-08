import { Message } from "./message";

export function MessageBox() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; // Sample array

  return (
    <div className="py-2 overflow-scroll border-t border-gray-200 h-[65.5vh]">
      {arr.map((item) => (
        <Message key={item} username={`User ${item}`} text={`Sample text sfsfkhsfa\fsksksfhkshfkshf sfs
        sfskfhskfsa\
        sfskfahfaf
        skfhskagkg${item}`} />
      ))}
    </div>
  );
}
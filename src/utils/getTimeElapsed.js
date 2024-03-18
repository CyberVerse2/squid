export function getElapsedTimeDescription(dateString) {
  const specificDate = new Date(dateString);
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - specificDate;
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const millisecondsInAWeek = millisecondsInADay * 7;
  const millisecondsInAMonth = millisecondsInADay * 30;

  if (differenceInMilliseconds / millisecondsInADay < 7) {
    return `${1}d`;
  } else if (differenceInMilliseconds < millisecondsInAWeek) {
    return '1w';
  } else if (differenceInMilliseconds > millisecondsInAWeek) {
    return `${Math.floor(differenceInMilliseconds / millisecondsInAWeek)}w`;
  } else if (differenceInMilliseconds < millisecondsInAMonth) {
    return '2w';
  } else {
    return '1m';
  }
}

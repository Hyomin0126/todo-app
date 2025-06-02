export function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };
  const monthString = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = d.getMonth();
  const currentMonthString = monthString[currentMonth];

  return (
    currentMonthString +
    " " +
    pad(d.getDate()) +
    ", " +
    d.getFullYear() +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}

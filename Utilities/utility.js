export function dateToStr(d, format) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  };
  const weekdayString = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
  const dayOfWeek = weekdayString[d.getDay()];
  const currentMonth = d.getMonth();
  const currentMonthString = monthString[currentMonth];
  if (format === "weekday") {
    return `${dayOfWeek}, ${currentMonthString} ${pad(d.getDate())}`;
  }

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

export const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function getMonthAndYear(date: any) {
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthYear = `${monthArray[month]}-${year}`;
  return String(monthYear);
}

export const numberOfBirds = 475;

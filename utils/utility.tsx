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

export function getMonthAndYear(date: Date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = Math.ceil(daysInMonth / 7);
  const monthYear = `${monthArray[month]}-${year}`;
  const monthYearString = String(monthYear);
  return String(monthYear);
}

export function disableButtonIfFormDataEmpty(formData: any) {
  const isButtonDisabled = Object.values(formData).some(
    (value) => value === ""
  );
  return isButtonDisabled;
}

export function formatDate(date?: any) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${day}-${month}-${year}`;
}

export function parseDate(dateString: any) {
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
}

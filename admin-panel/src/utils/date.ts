export function formatMonthYear(date: Date) {
  if (!date) return "-";

  return date.toLocaleString("en-IN", {
    month: "long",
    year: "numeric",
  });
}

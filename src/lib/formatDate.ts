export function formatDate(date?: string | number | Date) {
  if (!date) {
    return undefined;
  }
  return new Date(date).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

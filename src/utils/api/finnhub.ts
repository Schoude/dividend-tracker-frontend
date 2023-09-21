export function getFinnhubDate(monthsAgo = 0) {
  const today = new Date();
  today.setMonth(today.getMonth() - monthsAgo);
  const year = today.getFullYear();
  // Add 1 to month because it's 0-based
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

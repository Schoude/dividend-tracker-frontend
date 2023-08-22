export const months = new Map([
  [1, "Januar"],
  [2, "Februar"],
  [3, "März"],
  [4, "April"],
  [5, "Mai"],
  [6, "Juni"],
  [7, "Juli"],
  [8, "August"],
  [9, "September"],
  [10, "Oktober"],
  [11, "November"],
  [12, "Dezember"],
]);

export function isInPast(unixDate: number) {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  return unixDate < today.getTime();
}

export function isInFuture(unixDate: number) {
  const today = new Date();
  today.setHours(23);
  today.setMinutes(59);
  today.setSeconds(59);

  return unixDate > today.getTime();
}

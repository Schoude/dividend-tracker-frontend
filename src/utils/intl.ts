
export function formatCurrency(
  value: number,
  currency: "USD" | "EUR" = "USD",
  locale: "en-US" | "de-DE" = "en-US",
  notation?: "standard" | "scientific" | "engineering" | "compact" | undefined,
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    notation,
  })
    .format(value);
}

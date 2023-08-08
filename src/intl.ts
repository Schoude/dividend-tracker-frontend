export function formatCurrency(
  value: number,
  currency: 'USD' | 'EUR' = 'USD',
  locale: 'en-US' | 'de-DE' = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })
    .format(value)
}

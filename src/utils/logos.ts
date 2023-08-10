import type { Fund, Stock } from '../types';

export function getLogoUrl(instrument: Stock | Fund): string {
  return `${import.meta.env.VITE_ASSETS_URL_BASE}/${instrument.image_id}/dark.svg`;
}

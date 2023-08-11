import type { Fund, StockFullInfo } from '../types';

export function getLogoUrl(instrument: StockFullInfo | Fund): string {
  return `${import.meta.env.VITE_ASSETS_URL_BASE}/${instrument.image_id}/dark.svg`;
}

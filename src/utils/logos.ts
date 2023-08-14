import type { FundFullInfo, StockFullInfo } from '../types';

export function getLogoUrl(instrument: StockFullInfo | FundFullInfo): string {
  return `${import.meta.env.VITE_ASSETS_URL_BASE}/${instrument.image_id}/dark.svg`;
}

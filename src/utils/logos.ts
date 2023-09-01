import type { FundFullInfo, StockFullInfo } from "../types";

export function getLogoUrl(instrument: StockFullInfo | FundFullInfo): string {
  if (instrument.image_id == null) {
    console.log(instrument);
  }

  return instrument?.image_id ? `${import.meta.env.VITE_ASSETS_URL_BASE}/${instrument.image_id}/dark.svg` : '';
}

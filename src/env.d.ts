/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BASE: string;
  readonly VITE_ASSETS_URL_BASE: string;
  readonly FINNHUB_API_TOKEN: string;
  readonly ALPHA_VANTAGE_API_TOKEN: string;
  readonly ALPHA_VANTAGE_API_URL: string;
  readonly FINNHUB_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

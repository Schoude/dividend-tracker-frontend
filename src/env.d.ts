/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BASE: string
  readonly VITE_ASSETS_URL_BASE: string
  readonly VITE_EXCHANGE_RATE_USD_EUR: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

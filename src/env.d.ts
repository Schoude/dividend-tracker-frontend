/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

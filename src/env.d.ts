/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GTM_ID: string;
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

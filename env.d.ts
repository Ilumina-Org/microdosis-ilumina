//@ts-ignore
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE: string;
  readonly GOOGLE_SHEET_API_KEY: string;
  readonly GOOGLE_SHEET_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

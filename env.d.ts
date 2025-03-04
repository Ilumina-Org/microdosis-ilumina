//@ts-ignore
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly GOOGLE_TYPE: string;
  readonly GOOGLE_PROJECT_ID: string;
  readonly GOOGLE_PRIVATE_KEY_ID: string;
  readonly GOOGLE_PRIVATE_KEY: string;
  readonly GOOGLE_CLIENT_EMAIL: string;
  readonly GOOGLE_CLIENT_ID: string;
  readonly GOOGLE_AUTH_URI: string;
  readonly GOOGLE_TOKEN_URI: string;
  readonly GOOGLE_AUTH_PROVIDER_X509_CERT_URL: string;
  readonly GOOGLE_CLIENT_X509_CERT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

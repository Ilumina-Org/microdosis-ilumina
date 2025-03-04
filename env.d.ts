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
  readonly CULQI_SECRET_KEY: string;
  readonly CULQI_PUBLIC_KEY: string;
  readonly MP_ACCESS_TOKEN: string;
  readonly PUBLIC_MERCADOPAGO_PUBLIC_KEY: string;
  readonly SITE: string;
  readonly GOOGLE_SHEET_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

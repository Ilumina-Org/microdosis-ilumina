import { google } from 'googleapis';

const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
const SHEETS = {
  INVENTORY: "Inventario",
  ORDERS: "Ordenes",
  PRODUCTS: "Productos"
};
const getGoogleSheetsClient = async () => {
  const credentials = {
    type: process.env.GOOGLE_TYPE || "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    // Importante: reemplaza \\n por \n
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
    token_uri: process.env.GOOGLE_TOKEN_URI || "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
  };
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  return google.sheets({ version: "v4", auth });
};

export { SHEETS as S, SPREADSHEET_ID as a, getGoogleSheetsClient as g };

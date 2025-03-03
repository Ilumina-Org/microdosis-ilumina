import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
const SHEETS = {
  INVENTORY: "Inventario",
  ORDERS: "Ordenes",
  PRODUCTS: "Productos"
};
const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname, "../../credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  return google.sheets({ version: "v4", auth });
};

export { SHEETS as S, SPREADSHEET_ID as a, getGoogleSheetsClient as g };

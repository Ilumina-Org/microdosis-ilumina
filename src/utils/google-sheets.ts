import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
export const SHEETS = {
  INVENTORY: "Inventario",
  ORDERS: "Ordenes",
  PRODUCTS: "Productos",
};

export const getGoogleSheetsClient = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname, "../../credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
};

export const ensureSheetExists = async (
  sheets: any,
  sheetTitle: string,
  headers: string[],
) => {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });

    const sheet = response.data.sheets?.find(
      (s: any) => s.properties?.title === sheetTitle,
    );

    if (!sheet) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                },
              },
            },
          ],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${sheetTitle}!A1:${String.fromCharCode(65 + headers.length - 1)}1`,
        valueInputOption: "RAW",
        requestBody: {
          values: [headers],
        },
      });
    }
  } catch (error) {
    console.error(`Error ensuring sheet ${sheetTitle} exists:`, error);
    throw error;
  }
};

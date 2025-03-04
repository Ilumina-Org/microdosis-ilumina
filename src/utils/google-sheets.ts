import { google } from "googleapis";
export const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
export const SHEETS = {
  INVENTORY: "Inventario",
  ORDERS: "Ordenes"
};

export const getGoogleSheetsClient = async () => {
  const credentials = {
    type: import.meta.env.GOOGLE_TYPE || "service_account",
    project_id: import.meta.env.GOOGLE_PROJECT_ID,
    private_key_id: import.meta.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
    client_id: import.meta.env.GOOGLE_CLIENT_ID,
    auth_uri:
      import.meta.env.GOOGLE_AUTH_URI ||
      "https://accounts.google.com/o/oauth2/auth",
    token_uri:
      import.meta.env.GOOGLE_TOKEN_URI || "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url:
      import.meta.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL ||
      "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: import.meta.env.GOOGLE_CLIENT_X509_CERT_URL,
  };

  const auth = new google.auth.GoogleAuth({
    credentials,
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

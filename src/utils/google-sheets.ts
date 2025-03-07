import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

export const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
export const SHEETS = {
  INVENTORY: "Inventario",
  ORDERS: "Ordenes",
};

// Función para obtener el documento de Google Spreadsheet
export const getGoogleSpreadsheetDoc = async () => {
  try {
    const serviceAccountAuth = new JWT({
      email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    return doc;
  } catch (error) {
    console.error("Error initializing Google Spreadsheet document:", error);
    throw error;
  }
};

// Función adaptada para usar google-spreadsheet en lugar de googleapis
export const getGoogleSheetsClient = async () => {
  // Esta función ahora devuelve un wrapper compatible con la interfaz anterior
  const doc = await getGoogleSpreadsheetDoc();

  // Crear un wrapper que imita la API de googleapis para mantener compatibilidad
  const sheetsWrapper = {
    spreadsheets: {
      get: async ({ spreadsheetId }: { spreadsheetId: string }) => {
        return {
          data: {
            sheets: Object.values(doc.sheetsById).map((sheet) => ({
              properties: {
                title: sheet.title,
                sheetId: sheet.sheetId,
              },
            })),
          },
        };
      },
      values: {
        get: async ({
          spreadsheetId,
          range,
        }: {
          spreadsheetId: string;
          range: string;
        }) => {
          const [sheetTitle, cellRange] = range.split("!");
          const sheet = doc.sheetsByTitle[sheetTitle];

          if (!sheet) {
            throw new Error(`Sheet ${sheetTitle} not found`);
          }

          await sheet.loadCells(cellRange || "A1:Z1000");

          // Extraer los valores en formato similar a googleapis
          const values: any[][] = [];

          // Si no hay un rango específico, cargar todo
          const matches = cellRange
            ? cellRange.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/)
            : null;

          if (matches) {
            const [_, startCol, startRow, endCol, endRow] = matches;
            const startColIndex = startCol.charCodeAt(0) - 65; // A -> 0
            const endColIndex = endCol.charCodeAt(0) - 65;
            const startRowIndex = parseInt(startRow) - 1;
            const endRowIndex = parseInt(endRow) - 1;

            for (
              let rowIndex = startRowIndex;
              rowIndex <= endRowIndex;
              rowIndex++
            ) {
              const rowValues = [];
              for (
                let colIndex = startColIndex;
                colIndex <= endColIndex;
                colIndex++
              ) {
                const cell = sheet.getCell(rowIndex, colIndex);
                rowValues.push(cell.value);
              }
              values.push(rowValues);
            }
          } else {
            // Si no hay rango específico, obtener las filas
            const rows = await sheet.getRows();
            rows.forEach((row) => {
              const rowValues = Object.values(row.toObject());
              values.push(rowValues);
            });
          }

          return { data: { values } };
        },
        update: async ({
          spreadsheetId,
          range,
          valueInputOption,
          requestBody,
        }: {
          spreadsheetId: string;
          range: string;
          valueInputOption: string;
          requestBody: { values: any[][] };
        }) => {
          const [sheetTitle, cellRange] = range.split("!");
          const sheet = doc.sheetsByTitle[sheetTitle];

          if (!sheet) {
            throw new Error(`Sheet ${sheetTitle} not found`);
          }

          if (cellRange) {
            await sheet.loadCells(cellRange);

            const matches = cellRange.match(/([A-Z]+)(\d+):([A-Z]+)(\d+)/);
            if (matches) {
              const [_, startCol, startRow, endCol, endRow] = matches;
              const startColIndex = startCol.charCodeAt(0) - 65;
              const startRowIndex = parseInt(startRow) - 1;

              requestBody.values.forEach((rowValues, rowOffset) => {
                rowValues.forEach((value, colOffset) => {
                  const cell = sheet.getCell(
                    startRowIndex + rowOffset,
                    startColIndex + colOffset,
                  );
                  cell.value = value;
                });
              });

              await sheet.saveUpdatedCells();
            }
          } else {
            // Si estamos actualizando toda la hoja, usar addRows
            // Limpiar la hoja primero
            const rows = await sheet.getRows();
            for (const row of rows) {
              await row.delete();
            }

            // Agregar nuevas filas
            await sheet.addRows(
              requestBody.values.map((rowValues) => {
                const rowData: Record<string, any> = {};
                sheet.headerValues?.forEach((header, index) => {
                  if (rowValues[index] !== undefined) {
                    rowData[header] = rowValues[index];
                  }
                });
                return rowData;
              }),
            );
          }

          return { data: {} };
        },
      },
      batchUpdate: async ({
        spreadsheetId,
        requestBody,
      }: {
        spreadsheetId: string;
        requestBody: { requests: any[] };
      }) => {
        for (const request of requestBody.requests) {
          if (request.addSheet) {
            const { title } = request.addSheet.properties;
            await doc.addSheet({ title });
          }
          // Implementar otros tipos de solicitudes según sea necesario
        }

        return { data: {} };
      },
    },
  };

  return sheetsWrapper;
};

// Función para asegurar que una hoja exista
export const ensureSheetExists = async (
  sheets: any,
  sheetTitle: string,
  headers: string[],
) => {
  try {
    // Usar directamente google-spreadsheet en lugar del wrapper
    const doc = await getGoogleSpreadsheetDoc();

    // Verificar si la hoja existe
    const sheet = doc.sheetsByTitle[sheetTitle];

    if (!sheet) {
      // Crear la hoja con los encabezados
      await doc.addSheet({
        title: sheetTitle,
        headerValues: headers,
      });
    } else {
      // Actualizar los encabezados si la hoja ya existe
      await sheet.loadCells(
        `A1:${String.fromCharCode(65 + headers.length - 1)}1`,
      );

      for (let i = 0; i < headers.length; i++) {
        const cell = sheet.getCell(0, i);
        cell.value = headers[i];
      }

      await sheet.saveUpdatedCells();
    }
  } catch (error) {
    console.error(`Error ensuring sheet ${sheetTitle} exists:`, error);
    throw error;
  }
};

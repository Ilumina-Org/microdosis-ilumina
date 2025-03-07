import { INVENTORY_SHEET } from "./constants";

type SheetRange = string;
type SheetValues = (string | number | boolean | null)[][];

interface SheetResponse {
  values: SheetValues;
  range: string;
  majorDimension: string;
}

interface SheetUpdateResponse {
  spreadsheetId: string;
  updatedRange: string;
  updatedRows: number;
  updatedColumns: number;
  updatedCells: number;
}

interface SheetAppendResponse extends SheetUpdateResponse {
  tableRange: string;
}

//@ts-ignore
const SPREADSHEET_ID = import.meta.env.GOOGLE_SHEET_ID as string;
//@ts-ignore
const API_KEY = import.meta.env.GOOGLE_SHEET_API_KEY as string;

/**
 * Obtiene datos de una hoja de cálculo de Google
 * @param sheetName Nombre de la hoja
 * @param range Rango de celdas (por defecto: "A1:Z1000")
 * @returns Valores de la hoja
 */
async function getSheetData(
  sheetName: string,
  range: SheetRange = "A1:Z1000",
): Promise<SheetValues> {
  if (!SPREADSHEET_ID) {
    console.error("Error: SPREADSHEET_ID no está definido");
    throw new Error(
      "SPREADSHEET_ID no está configurado en las variables de entorno",
    );
  }

  if (!API_KEY) {
    console.error("Error: API_KEY no está definido");
    throw new Error("API_KEY no está configurado en las variables de entorno");
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}!${encodeURIComponent(range)}?key=${API_KEY}`;

    console.log(`Fetching sheet data from: ${sheetName}!${range}`);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error fetching sheet data: Status ${response.status}, Response: ${errorText}`,
      );
      throw new Error(
        `Error fetching sheet data: ${response.statusText} (${response.status})`,
      );
    }

    const data = (await response.json()) as SheetResponse;

    if (!data.values) {
      console.warn(`No values found in ${sheetName}!${range}`);
      return [];
    }

    return data.values;
  } catch (error) {
    console.error(
      `Error completo al obtener datos de la hoja ${sheetName}:`,
      error,
    );
    throw error;
  }
}

/**
 * Actualiza datos en una hoja de cálculo de Google
 * @param sheetName Nombre de la hoja
 * @param range Rango de celdas a actualizar
 * @param values Valores a insertar
 * @returns Respuesta de la API
 */
async function updateSheetData(
  sheetName: string,
  range: SheetRange,
  values: SheetValues,
): Promise<SheetUpdateResponse> {
  if (!SPREADSHEET_ID || !API_KEY) {
    throw new Error(
      "SPREADSHEET_ID o API_KEY no están configurados en las variables de entorno",
    );
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}!${encodeURIComponent(range)}?valueInputOption=USER_ENTERED&key=${API_KEY}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error updating sheet data: Status ${response.status}, Response: ${errorText}`,
      );
      throw new Error(
        `Error updating sheet data: ${response.statusText} (${response.status})`,
      );
    }

    return (await response.json()) as SheetUpdateResponse;
  } catch (error) {
    console.error(
      `Error completo al actualizar datos en la hoja ${sheetName}:`,
      error,
    );
    throw error;
  }
}

/**
 * Añade datos al final de una hoja de cálculo de Google
 * @param sheetName Nombre de la hoja
 * @param values Valores a añadir
 * @returns Respuesta de la API
 */
async function appendSheetData(
  sheetName: string,
  values: SheetValues,
): Promise<SheetAppendResponse> {
  if (!SPREADSHEET_ID || !API_KEY) {
    throw new Error(
      "SPREADSHEET_ID o API_KEY no están configurados en las variables de entorno",
    );
  }

  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS&key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Error appending sheet data: Status ${response.status}, Response: ${errorText}`,
      );
      throw new Error(
        `Error appending sheet data: ${response.statusText} (${response.status})`,
      );
    }

    return (await response.json()) as SheetAppendResponse;
  } catch (error) {
    console.error(
      `Error completo al añadir datos a la hoja ${sheetName}:`,
      error,
    );
    throw error;
  }
}

/**
 * Elimina una fila en una hoja de cálculo de Google
 * @param sheetName Nombre de la hoja
 * @param rowIndex Índice de la fila a eliminar (0-based)
 * @returns Respuesta de la API
 */
async function deleteSheetRow(
  sheetName: string,
  rowIndex: number,
): Promise<SheetUpdateResponse> {
  if (!SPREADSHEET_ID || !API_KEY) {
    throw new Error(
      "SPREADSHEET_ID o API_KEY no están configurados en las variables de entorno",
    );
  }

  try {
    // Obtenemos todos los datos
    const allData = await getSheetData(sheetName);

    if (rowIndex < 0 || rowIndex >= allData.length) {
      throw new Error(`Row index out of bounds: ${rowIndex}`);
    }

    allData.splice(rowIndex, 1);

    return await updateSheetData(
      sheetName,
      `A1:${String.fromCharCode(65 + Math.max(...allData.map((row) => row.length)) - 1)}${allData.length}`,
      allData,
    );
  } catch (error) {
    console.error(
      `Error completo al eliminar la fila ${rowIndex} de la hoja ${sheetName}:`,
      error,
    );
    throw error;
  }
}

/**
 * Verifica si una hoja existe y crea los encabezados si es necesario
 * @param sheetName Nombre de la hoja
 * @param headers Encabezados para la hoja
 */
async function ensureSheetExists(
  sheetName: string,
  headers: string[],
): Promise<void> {
  try {
    // Primero verificamos si la hoja existe
    await getSheetData(sheetName, "A1:A2");

    // Luego verificamos los encabezados
    const headerData = await getSheetData(sheetName, "A1:Z1");

    if (!headerData || !headerData.length) {
      console.log(`Creando encabezados en la hoja ${sheetName}`);
      await updateSheetData(sheetName, "A1", [headers]);
    }
  } catch (error) {
    console.error(`Error al verificar o crear la hoja ${sheetName}:`, error);
    throw new Error(
      `La hoja ${sheetName} no existe o no se puede acceder. Por favor, créala manualmente o verifica los permisos.`,
    );
  }
}

// Función para verificar la configuración
async function verifyGoogleSheetsConfig(): Promise<boolean> {
  if (!SPREADSHEET_ID) {
    console.error(
      "Error: SPREADSHEET_ID no está definido en las variables de entorno",
    );
    return false;
  }

  if (!API_KEY) {
    console.error(
      "Error: API_KEY no está definido en las variables de entorno",
    );
    return false;
  }

  try {
    // Intenta obtener información básica de la hoja para verificar la conexión
    await getSheetData(INVENTORY_SHEET, "A1:A1");
    console.log("Conexión a Google Sheets verificada correctamente");
    return true;
  } catch (error) {
    console.error("Error al verificar la conexión a Google Sheets:", error);
    return false;
  }
}

export {
  getSheetData,
  updateSheetData,
  appendSheetData,
  deleteSheetRow,
  ensureSheetExists,
  verifyGoogleSheetsConfig,
  INVENTORY_SHEET,
};

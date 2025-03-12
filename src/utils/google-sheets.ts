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
  // 1. Usar el ID de publicación de la URL que generaste
  const PUBLISHED_SHEET_ID =
    "2PACX-1vRyo_8ixf17YTHOg0IlXZKxhSL0Hhiulq_ujFjg5b60010Cjry4ZiwMrYnOwFnh2YbWWU1xhLGejF8S";

  // 2. GID específico de tu pestaña (lo obtienes de la URL de edición)
  const GID = "1721761715";

  try {
    // Codificar parámetros
    const encodedRange = encodeURIComponent(range);

    // Nueva URL con formato de publicación web
    const url = `https://docs.google.com/spreadsheets/d/e/${PUBLISHED_SHEET_ID}/pub?output=csv&gid=${GID}&range=${encodedRange}`;

    console.log(`Fetching data from URL: ${url}`);

    // Headers importantes para evitar bloqueos
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept: "text/csv",
      },
    });

    if (!response.ok) {
      const errorContent = await response.text();
      throw new Error(
        `HTTP Error ${response.status}: ${errorContent.slice(0, 100)}...`,
      );
    }

    const csvData = await response.text();

    return csvData
      .split("\n")
      .filter((line) => line.trim())
      .map(parseCSVLine);
  } catch (error) {
    console.error(`Error crítico: ${error.message}`);
    throw new Error("Error al obtener datos de Google Sheets");
  }
}

function parseCSVLine(line: string): string[] {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (i + 1 < line.length && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  // Add the last field
  result.push(current);
  return result;
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
  headers: string[] = [
    "SKU",
    "Título",
    "Precio",
    "Precio Regular",
    "Stock",
    "Total",
    "Notas",
    "Featured",
    "Tipo",
    "Tier",
    "BenefitGeneral",
    "Quienes Pueden Usarlo",
    "Uso Diario",
  ],
): Promise<void> {
  try {
    await getSheetData(sheetName, "A1:A2");
    const headerData = await getSheetData(sheetName, "A1:M1");

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

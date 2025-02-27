import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
const INVENTORY_SHEET = "Inventario";

interface StockData {
  [key: string]: {
    disponible: number;
    reservado: number;
    total: number;
    notas: string;
  };
}

let cache: {
  data: StockData;
  timestamp: number;
} | null = null;

const CACHE_TTL = 60000; // 1 minuto

export const getStock = async (): Promise<StockData> => {
  // Usar caché si está disponible y no ha expirado
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return cache.data;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "../../credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Obtener un rango más amplio para incluir todas las columnas relevantes
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${INVENTORY_SHEET}!A2:E`, // Incluye columnas A (SKU), B (Disponible), C (Reservado), D (Total), E (Notas)
    });

    const stockData: StockData = {};

    if (response.data.values && response.data.values.length > 0) {
      response.data.values.forEach((row) => {
        // Ignorar filas vacías
        if (!row[0]) return;

        const sku = row[0];
        const disponible = parseInt(row[1]) || 0;
        const reservado = parseInt(row[2]) || 0;
        const total = parseInt(row[3]) || disponible; // Si no hay total, usar disponible
        const notas = row[4] || ""; // Capturamos las notas (columna E)

        stockData[sku] = {
          disponible,
          reservado,
          total,
          notas,
        };
      });
    }

    cache = {
      data: stockData,
      timestamp: Date.now(),
    };

    console.log(
      "Stock data fetched successfully",
      JSON.stringify(cache.data, null, 2),
    );
    return stockData;
  } catch (error) {
    console.error("Error fetching stock:", error);
    return cache?.data || {};
  }
};

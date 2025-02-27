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

const CACHE_TTL = 60000;

export const getStock = async (): Promise<StockData> => {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log(
      "Usando datos del caché (última actualización hace menos de 1 minuto).",
    );
    return cache.data;
  }

  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "../../credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${INVENTORY_SHEET}!A2:E100`,
    });

    const stockData: StockData = {};
    const seenSkus = new Set();

    if (response.data.values && response.data.values.length > 0) {
      response.data.values.forEach((row) => {
        const sku = row[0]?.trim();
        if (!sku || seenSkus.has(sku)) {
          console.warn(`SKU duplicado o inválido: ${sku}. Fila omitida.`);
          return;
        }
        seenSkus.add(sku);

        const disponible = parseInt(row[1], 10);
        const reservado = parseInt(row[2], 10);
        const total = parseInt(row[3], 10);

        if (isNaN(disponible) || isNaN(reservado) || isNaN(total)) {
          console.warn(`Datos inválidos para el SKU ${sku}. Fila omitida.`);
          return;
        }

        if (disponible < 0 || reservado < 0 || total < 0) {
          console.warn(
            `Valores negativos encontrados para el SKU ${sku}. Fila omitida.`,
          );
          return;
        }

        stockData[sku] = {
          disponible: disponible || 0,
          reservado: reservado || 0,
          total: total || disponible || 0,
          notas: row[4] || "",
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

    if (cache && Date.now() - cache.timestamp < CACHE_TTL * 2) {
      console.warn("Usando caché debido a un error al obtener datos nuevos.");
      return cache.data;
    }

    console.error("No se pudo obtener el stock ni usar el caché.");
    return {};
  }
};

export const invalidateCache = () => {
  cache = null;
  console.log("Caché invalidado.");
};

export const getProducts = async () => {
  try {
    const stockData = await getStock();
    const auth = new google.auth.GoogleAuth({
      keyFile: path.resolve(__dirname, "../../credentials.json"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `Productos!A2:H`,
    });

    return (
      response.data.values
        ?.map((row, index) => {
          const sku = row[0];

          if (!stockData[sku]) {
            console.warn(
              `SKU ${sku} no encontrado en el inventario. Producto omitido.`,
            );
            return null;
          }

          const product = {
            sku: sku,
            title: row[1],
            productDetail: `Precio Regular $${row[3]}`,
            productPrice: `$${row[2]}`,
            productDeal: `(Ahorra ${Math.round((1 - parseFloat(row[2]) / parseFloat(row[3])) * 100)}%)`, // Usando row[2] y row[3]
            imageUrl: row[4],
            tier: parseInt(row[5]),
            link: row[6],
            stock: stockData[sku]?.disponible > 0,
          };

          return product;
        })
        .filter(Boolean) || []
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

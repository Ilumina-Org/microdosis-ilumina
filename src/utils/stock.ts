import { google } from "googleapis";

interface Env {
  STOCK_KV: KVNamespace;
}

interface StockData {
  [sku: string]: {
    disponible: number;
    reservado: number;
    total: number;
    notas: string;
  };
}

export const getStock = async (env: Env): Promise<StockData> => {
  const cached = await env.STOCK_KV.get("stock-data", "json");
  if (cached) return cached;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
        private_key: import.meta.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: import.meta.env.SPREADSHEET_ID,
      range: "Inventario!A2:E100",
    });

    const stockData: StockData = {};
    response.data.values?.forEach((row) => {
      const sku = row[0]?.trim();
      if (sku) {
        stockData[sku] = {
          disponible: parseInt(row[1], 10) || 0,
          reservado: parseInt(row[2], 10) || 0,
          total: parseInt(row[3], 10) || 0,
          notas: row[4] || "",
        };
      }
    });

    await env.STOCK_KV.put("stock-data", JSON.stringify(stockData), {
      expirationTtl: 60, // 1 minuto
    });

    return stockData;
  } catch (error) {
    console.error("Error fetching stock:", error);
    throw error;
  }
};

export const getProducts = async (env: Env) => {
  const stockData = await getStock(env);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
      private_key: import.meta.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: import.meta.env.SPREADSHEET_ID,
    range: "Productos!A2:H",
  });

  return response.data.values
    ?.map((row) => {
      const sku = row[0];
      if (!stockData[sku]) return null;

      return {
        sku,
        title: row[1],
        productPrice: `$${row[2]}`,
        productDeal: `Ahorra ${Math.round((1 - parseFloat(row[2]) / parseFloat(row[3])) * 100)}%`,
        imageUrl: row[4],
        stock: stockData[sku].disponible > 0,
      };
    })
    .filter(Boolean);
};

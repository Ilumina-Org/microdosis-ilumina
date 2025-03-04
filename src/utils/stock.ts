import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from "./google-sheets";
import type { StockItem } from "../types/inventory";

type StockData = Record<string, StockItem>;

export const getStock = async (): Promise<StockData> => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:J`, // Added J to include Tier column
    });

    const stockData: StockData = {};
    const seenSkus = new Set();

    if (response.data.values && response.data.values.length > 0) {
      response.data.values.forEach((row, index) => {
        const [
          sku,
          title,
          price,
          regularPrice,
          disponible,
          total,
          notas,
          featured,
          tipo,
          tier,
        ] = row;

        // Skip invalid or duplicate SKUs
        if (!sku?.trim() || seenSkus.has(sku)) {
          console.warn(`SKU duplicado o inválido: ${sku}. Fila omitida.`);
          return;
        }

        seenSkus.add(sku);

        // Parse numeric values with robust error handling
        const numDisponible = parseInt(disponible, 10) || 0;
        const numTotal = parseInt(total, 10) || numDisponible;
        const numPrice = parseFloat(price) || 0;
        const numRegularPrice = parseFloat(regularPrice) || 0;
        const numTier = parseInt(tier, 10) || 0;

        // Validate non-negative values
        if (numDisponible < 0 || numTotal < 0) {
          console.warn(
            `Valores negativos encontrados para el SKU ${sku}. Fila omitida.`,
          );
          return;
        }

        stockData[sku] = {
          sku: sku.trim(),
          title: title || "",
          price: numPrice,
          regularPrice: numRegularPrice,
          disponible: numDisponible,
          total: numTotal,
          notas: notas || "",
          featured: featured === "TRUE",
          tipo: tipo === "subscription" ? "subscription" : "package",
          tier: numTier,
        };
      });
    }

    console.log("Stock data fetched successfully");
    return stockData;
  } catch (error) {
    console.error("Error fetching stock:", error);
    return {};
  }
};

export const getProducts = async (): Promise<any[]> => {
  try {
    const stockData = await getStock();

    return Object.values(stockData).map((item) => {
      const discountPercentage =
        item.price && item.regularPrice
          ? Math.round((1 - item.price / item.regularPrice) * 100)
          : 0;

      return {
        sku: item.sku,
        title: item.title,
        productDetail: `Precio Regular $${item.regularPrice.toFixed(2)}`,
        productPrice: `$${item.price.toFixed(2)}`,
        productDeal:
          discountPercentage > 0 ? `(Ahorra ${discountPercentage}%)` : "",
        stock: item.disponible > 0,
        tipo: item.tipo,
        tier: item.tier,
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

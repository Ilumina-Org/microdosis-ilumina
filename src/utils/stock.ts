import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from "./google-sheets";
import type { StockItem } from "../types/inventory";

type StockData = Record<string, StockItem>;

export const getStock = async (): Promise<StockData> => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:I`,
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
        ] = row;

        if (!sku?.trim() || seenSkus.has(sku)) {
          console.warn(`SKU duplicado o inválido: ${sku}. Fila omitida.`);
          return;
        }
        seenSkus.add(sku);

        const numDisponible = parseInt(disponible, 10);
        const numTotal = parseInt(total, 10);
        const numPrice = parseFloat(price);
        const numRegularPrice = parseFloat(regularPrice);

        // Asignar valores por defecto si no existen
        const disponibleFinal = isNaN(numDisponible) ? 0 : numDisponible;
        const totalFinal = isNaN(numTotal) ? disponibleFinal : numTotal;

        // Validar que no sean negativos
        if (disponibleFinal < 0 || totalFinal < 0) {
          console.warn(
            `Valores negativos encontrados para el SKU ${sku}. Fila omitida.`,
          );
          return;
        }

        // Log de los valores antes de agregar al stockData
        console.log(
          `Fila ${index + 1}: SKU ${sku}, disponibleFinal: ${disponibleFinal}, totalFinal: ${totalFinal}`,
        );

        stockData[sku] = {
          sku: sku.trim(),
          title: title || "",
          price: numPrice || 0,
          regularPrice: numRegularPrice || 0,
          disponible: disponibleFinal,
          total: totalFinal,
          notas: notas || "",
          featured: featured === "true",
          tipo: (tipo === "subscription" ? "subscription" : "package") as
            | "package"
            | "subscription",
        };
      });
    }

    console.log("Stock data fetched successfully");
    return stockData;
  } catch (error) {
    console.error("Error fetching stock:", error);
    return {}; // Retornar vacío en caso de error
  }
};

export const getProducts = async (): Promise<any[]> => {
  try {
    const stockData = await getStock();

    console.log("Stock data fetched for products:", stockData); // Log para revisar el stockData completo

    return Object.values(stockData).map((item) => {
      console.log(
        `Evaluando SKU ${item.sku}, disponible: ${item.disponible}, stock: ${item.disponible > 0}`,
      ); // Log de cada producto

      return {
        sku: item.sku,
        title: item.title,
        productDetail: `Precio Regular $${item.regularPrice}`,
        productPrice: `$${item.price}`,
        productDeal: `(Ahorra ${Math.round((1 - item.price / item.regularPrice) * 100)}%)`,
        stock: item.disponible > 0, // Esto es donde validas el stock
        tipo: item.tipo,
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

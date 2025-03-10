import {
  getSheetData,
  updateSheetData,
  INVENTORY_SHEET,
} from "./google-sheets";
import type { StockItem } from "../types/inventory";

type StockData = Record<string, StockItem>;

// Definición de tipos
/**

 * Obtiene el inventario completo desde Google Sheets
 * @returns Objeto con los datos de inventario indexados por SKU
 */
export const getStock = async (): Promise<StockData> => {
  try {
    console.log("Obteniendo datos de stock desde la hoja:", INVENTORY_SHEET);
    const data = await getSheetData(INVENTORY_SHEET, "A2:M"); // Cambiado a M para incluir nuevas columnas

    console.log(`Datos obtenidos: ${data.length} filas`);

    const stockData: StockData = {};
    const seenSkus = new Set();

    if (data && data.length > 0) {
      data.forEach((row, index) => {
        if (row.length < 13) {
          // Actualizado a 13 columnas
          console.warn(`Fila ${index + 2} inválida (incompleta). Omitiendo.`);
          return;
        }

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
          beneficio_general,
          quienes_pueden_usarlo,
          uso_diario,
        ] = row;

        const cleanSku = String(sku).trim();
        if (!cleanSku) {
          console.warn(`Fila ${index + 2} sin SKU válido. Omitiendo.`);
          return;
        }

        if (seenSkus.has(cleanSku)) {
          console.warn(`SKU duplicado: ${cleanSku} en fila ${index + 2}`);
          return;
        }
        seenSkus.add(cleanSku);

        stockData[cleanSku] = {
          sku: cleanSku,
          title: String(title),
          price: Math.max(0, Number(price) || 0),
          regularPrice: Math.max(0, Number(regularPrice) || 0),
          disponible: Math.max(0, Number(disponible) || 0),
          total: Math.max(0, Number(total) || 0),
          notas: String(notas),
          featured: String(featured).toUpperCase() === "TRUE",
          tipo:
            String(tipo).toLowerCase() === "subscription"
              ? "subscription"
              : "package",
          tier: Math.max(0, Number(tier) || 0),
          beneficio_general: String(beneficio_general),
          quienes_pueden_usarlo: String(quienes_pueden_usarlo),
          uso_diario: String(uso_diario),
        };
      });
    }

    return stockData;
  } catch (error) {
    console.error("Error obteniendo stock:", error);
    return {};
  }
};

/**
 * Interfaz para los productos formateados para la UI
 */
interface Product {
  sku: string;
  title: string;
  productDetail: string;
  productPrice: string;
  productDeal: string;
  stock: boolean;
  tipo: string;
  tier: number;
}

/**featured: featured === "TRUE",

 * Obtiene productos formateados para mostrar en la UI
 * @returns Array de productos formateados
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    console.log("Obteniendo datos de productos...");
    const stockData = await getStock();
    const productCount = Object.keys(stockData).length;

    console.log(`Formateando ${productCount} productos para UI`);

    if (productCount === 0) {
      console.warn("No se encontraron productos en el inventario");
    }

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
    console.error("Error detallado al obtener productos:", error);
    return [];
  }
};

/**
 * Actualiza datos en la hoja de inventario
 * @param range Rango de celdas a actualizar
 * @param values Valores a insertar
 * @returns Respuesta de la API
 */
export const updateInventory = async (
  range: string,
  values: (string | number | boolean | null)[][],
): Promise<any> => {
  try {
    console.log(`Actualizando inventario en rango: ${range}`);
    const result = await updateSheetData(INVENTORY_SHEET, range, values);
    console.log("Datos de inventario actualizados correctamente:", result);
    return result;
  } catch (error) {
    console.error("Error detallado al actualizar inventario:", error);
    throw error;
  }
};

// Función auxiliar para verificar si un SKU existe
export const checkSkuExists = async (sku: string): Promise<boolean> => {
  try {
    const stockData = await getStock();
    return !!stockData[sku];
  } catch (error) {
    console.error(`Error al verificar si el SKU ${sku} existe:`, error);
    return false;
  }
};

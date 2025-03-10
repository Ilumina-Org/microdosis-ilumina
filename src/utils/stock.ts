import {
  getSheetData,
  updateSheetData,
  INVENTORY_SHEET,
} from "./google-sheets";
import type { StockItem, Order } from "../types/inventory";

type StockData = Record<string, StockItem>;

/**
 * Obtiene el inventario completo desde Google Sheets
 * @returns Objeto con los datos de inventario indexados por SKU
 */
export const getStock = async (): Promise<StockData> => {
  try {
    console.log("Obteniendo datos de stock desde la hoja:", INVENTORY_SHEET);
    const data = await getSheetData(INVENTORY_SHEET, "A2:M");
    console.log(`Datos obtenidos: ${data.length} filas`);

    const stockData: StockData = {};
    const seenSkus = new Set();

    if (data && data.length > 0) {
      data.forEach((row, index) => {
        if (row.length < 13) {
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
 * Extiende de StockItem para mantener todos los campos originales
 * y añade campos derivados para la UI
 */
export interface ProductUI extends StockItem {
  productDetail: string;
  productPrice: string;
  productDeal: string;
  stock: boolean;
  beneficioGeneral: string;
  quienesPuedenUsarlo: string;
  usoDiario: string;
}

/**
 * Obtiene productos formateados para mostrar en la UI
 * @returns Array de productos formateados
 */
export const getProducts = async (): Promise<ProductUI[]> => {
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
        ...item, // Mantener todos los campos originales de StockItem
        productDetail: `Precio Regular $${item.regularPrice.toFixed(2)}`,
        productPrice: `$${item.price.toFixed(2)}`,
        productDeal:
          discountPercentage > 0 ? `(Ahorra ${discountPercentage}%)` : "",
        stock: item.disponible > 0,
        beneficioGeneral: item.beneficio_general,
        quienesPuedenUsarlo: item.quienes_pueden_usarlo,
        usoDiario: item.uso_diario,
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

/**
 * Función auxiliar para verificar si un SKU existe
 * @param sku SKU a verificar
 * @returns true si el SKU existe, false en caso contrario
 */
export const checkSkuExists = async (sku: string): Promise<boolean> => {
  try {
    const stockData = await getStock();
    return !!stockData[sku];
  } catch (error) {
    console.error(`Error al verificar si el SKU ${sku} existe:`, error);
    return false;
  }
};

/**
 * Obtiene un item específico de inventario por su SKU
 * @param sku SKU del item a buscar
 * @returns El item encontrado o null si no existe
 */
export const getStockItemBySku = async (
  sku: string,
): Promise<StockItem | null> => {
  try {
    const stockData = await getStock();
    return stockData[sku] || null;
  } catch (error) {
    console.error(`Error al obtener el item con SKU ${sku}:`, error);
    return null;
  }
};

/**
 * Actualiza la disponibilidad de productos basado en una orden
 * @param order Orden con productos a actualizar
 * @returns true si la actualización fue exitosa, false en caso contrario
 */
export const updateStockFromOrder = async (order: Order): Promise<boolean> => {
  try {
    const stock = await getStock();
    const updateData: [string, number][] = [];

    for (const product of order.products) {
      const stockItem = stock[product.sku];
      if (!stockItem) {
        console.warn(
          `Producto con SKU ${product.sku} no encontrado en inventario`,
        );
        continue;
      }

      const newDisponible = Math.max(
        0,
        stockItem.disponible - product.quantity,
      );
      // Asumiendo que "disponible" está en columna E (índice 4)
      updateData.push([product.sku, newDisponible]);
    }

    if (updateData.length > 0) {
      // Formato para actualizar múltiples filas (usando batchUpdate)
      // Esta implementación dependerá de cómo está estructurada tu función updateSheetData
      // Podrías necesitar modificarla según tus necesidades específicas
      await Promise.all(
        updateData.map(async ([sku, newDisponible]) => {
          // Buscar la fila correspondiente al SKU y actualizar solo la columna "disponible"
          // Esto es solo un ejemplo, ajusta según la implementación real de tu función
          const rowIndex = await findRowIndexBySku(sku);
          if (rowIndex > 0) {
            await updateSheetData(INVENTORY_SHEET, `E${rowIndex}`, [
              [newDisponible],
            ]);
          }
        }),
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error al actualizar stock desde orden:", error);
    return false;
  }
};

/**
 * Función auxiliar para encontrar el índice de fila por SKU
 * Implementación de ejemplo - ajustar según necesidades
 */
const findRowIndexBySku = async (sku: string): Promise<number> => {
  try {
    const data = await getSheetData(INVENTORY_SHEET, "A2:A");
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === sku) {
        return i + 2; // +2 porque empezamos desde A2
      }
    }
    return -1;
  } catch (error) {
    console.error(`Error al buscar fila para SKU ${sku}:`, error);
    return -1;
  }
};

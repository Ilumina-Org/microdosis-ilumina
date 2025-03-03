import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from './google-sheets';
import type { StockItem } from '../types/inventory';

type StockData = Record<string, StockItem>;

let cache: {
  data: StockData;
  timestamp: number;
} | null = null;

const CACHE_TTL = 60000; // 1 minuto

export const getStock = async (): Promise<StockData> => {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    console.log("Usando datos del caché (última actualización hace menos de 1 minuto).");
    return cache.data;
  }

  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`,
    });

    const stockData: StockData = {};
    const seenSkus = new Set();

    if (response.data.values && response.data.values.length > 0) {
      response.data.values.forEach((row) => {
        const [
          sku,
          title,
          price,
          regularPrice,
          imageUrl,
          tier,
          link,
          disponible,
          reservado,
          total,
          notas,
          featured,
          tipo
        ] = row;

        if (!sku?.trim() || seenSkus.has(sku)) {
          console.warn(`SKU duplicado o inválido: ${sku}. Fila omitida.`);
          return;
        }
        seenSkus.add(sku);

        const numDisponible = parseInt(disponible, 10);
        const numReservado = parseInt(reservado, 10);
        const numTotal = parseInt(total, 10);
        const numTier = parseInt(tier, 10);
        const numPrice = parseFloat(price);
        const numRegularPrice = parseFloat(regularPrice);

        // Asignar valores por defecto si no existen
        const disponibleFinal = isNaN(numDisponible) ? 0 : numDisponible;
        const reservadoFinal = isNaN(numReservado) ? 0 : numReservado;
        const totalFinal = isNaN(numTotal) ? disponibleFinal + reservadoFinal : numTotal;

        // Solo validar que no sean negativos
        if (disponibleFinal < 0 || reservadoFinal < 0 || totalFinal < 0) {
          console.warn(`Valores negativos encontrados para el SKU ${sku}. Fila omitida.`);
          return;
        }

        stockData[sku] = {
          sku: sku.trim(),
          title: title || '',
          price: numPrice || 0,
          regularPrice: numRegularPrice || 0,
          imageUrl: imageUrl || '',
          tier: numTier || 0,
          link: link || '',
          disponible: disponibleFinal,
          reservado: reservadoFinal,
          total: totalFinal,
          notas: notas || '',
          featured: featured === 'true',
          tipo: (tipo === 'subscription' ? 'subscription' : 'package') as 'package' | 'subscription'
        };
      });
    }

    cache = {
      data: stockData,
      timestamp: Date.now(),
    };

    console.log("Stock data fetched successfully", JSON.stringify(cache.data, null, 2));
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
    return Object.values(stockData)
      .map(item => ({
        sku: item.sku,
        title: item.title,
        productDetail: `Precio Regular $${item.regularPrice}`,
        productPrice: `$${item.price}`,
        productDeal: `(Ahorra ${Math.round((1 - item.price / item.regularPrice) * 100)}%)`,
        imageUrl: item.imageUrl,
        tier: item.tier,
        link: item.link,
        stock: item.disponible > 0,
        tipo: item.tipo
      }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

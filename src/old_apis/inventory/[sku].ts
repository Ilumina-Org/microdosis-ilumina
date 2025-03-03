import type { APIRoute } from "astro";
import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from "../../../utils/google-sheets";
import type { StockItem } from "../../../types/inventory";
import { invalidateCache } from "../../../utils/stock";

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { sku } = params;
    const product = await request.json() as StockItem;
    const sheets = await getGoogleSheetsClient();

    // Buscar el SKU en la hoja
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`,
    });

    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const rowIndex = response.data.values.findIndex(row => row[0] === sku);
    if (rowIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Actualizar la fila
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A${rowIndex + 2}:M${rowIndex + 2}`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          product.sku,
          product.title,
          product.price,
          product.regularPrice,
          product.imageUrl,
          product.tier,
          product.link,
          product.disponible,
          product.reservado,
          product.total,
          product.notas,
          product.featured ? 'true' : 'false',
          product.tipo
        ]],
      },
    });

    // Invalidar caché
    invalidateCache();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al actualizar producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { sku } = params;
    const sheets = await getGoogleSheetsClient();

    // Buscar el SKU en la hoja
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`,
    });

    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const rowIndex = response.data.values.findIndex(row => row[0] === sku);
    if (rowIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Limpiar la fila (Google Sheets no permite eliminar filas via API)
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A${rowIndex + 2}:M${rowIndex + 2}`,
    });

    // Invalidar caché
    invalidateCache();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al eliminar producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

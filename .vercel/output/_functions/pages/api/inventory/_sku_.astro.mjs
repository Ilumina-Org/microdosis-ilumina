import { g as getGoogleSheetsClient, S as SHEETS, a as SPREADSHEET_ID } from '../../../chunks/google-sheets_DG2NWZlR.mjs';
import { i as invalidateCache } from '../../../chunks/stock_CyV-sWuA.mjs';
export { renderers } from '../../../renderers.mjs';

const PUT = async ({ params, request }) => {
  try {
    const { sku } = params;
    const product = await request.json();
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`
    });
    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const rowIndex = response.data.values.findIndex((row) => row[0] === sku);
    if (rowIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A${rowIndex + 2}:M${rowIndex + 2}`,
      valueInputOption: "RAW",
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
          product.featured ? "true" : "false",
          product.tipo
        ]]
      }
    });
    invalidateCache();
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al actualizar producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const DELETE = async ({ params }) => {
  try {
    const { sku } = params;
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`
    });
    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const rowIndex = response.data.values.findIndex((row) => row[0] === sku);
    if (rowIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Producto no encontrado" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A${rowIndex + 2}:M${rowIndex + 2}`
    });
    invalidateCache();
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al eliminar producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

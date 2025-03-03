import { g as getGoogleSheetsClient, S as SHEETS, a as SPREADSHEET_ID } from '../../../chunks/google-sheets_DG2NWZlR.mjs';
export { renderers } from '../../../renderers.mjs';

const GET = async ({ params }) => {
  try {
    const { orderId } = params;
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A2:H`
    });
    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const orderRow = response.data.values.find((row) => row[0] === orderId);
    if (!orderRow) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const [id, date, status, customerName, customerEmail, productsJson, total] = orderRow;
    let products = [];
    try {
      products = JSON.parse(productsJson);
    } catch (e) {
      console.error(`Error parsing products for order ${orderId}:`, e);
    }
    const order = {
      orderId: id,
      date,
      status,
      customerName,
      customerEmail,
      products,
      total: parseFloat(total)
    };
    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener la orden" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
const PUT = async ({ params, request }) => {
  try {
    const { orderId } = params;
    const updateData = await request.json();
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A2:H`
    });
    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const rowIndex = response.data.values.findIndex((row) => row[0] === orderId);
    if (rowIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!C${rowIndex + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[updateData.status]]
      }
    });
    return new Response(
      JSON.stringify({ success: true, message: "Estado actualizado correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al actualizar la orden" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

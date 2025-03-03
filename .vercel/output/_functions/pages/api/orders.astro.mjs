import { g as getGoogleSheetsClient, S as SHEETS, a as SPREADSHEET_ID } from '../../chunks/google-sheets_TmfKgee1.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A2:H`
    });
    const orders = [];
    if (response.data.values) {
      response.data.values.forEach((row) => {
        const [orderId, date, status, customerName, customerEmail, productsJson, total] = row;
        if (orderId) {
          try {
            const products = JSON.parse(productsJson);
            orders.push({
              orderId,
              date,
              status,
              customerName,
              customerEmail,
              products,
              total: Number(total)
            });
          } catch (e) {
            console.error(`Error parsing products for order ${orderId}:`, e);
          }
        }
      });
    }
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al obtener órdenes" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import type { APIRoute } from "astro";
import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from "../../../utils/google-sheets";
import type { Order } from "../../../types/inventory";

export const GET: APIRoute = async () => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A2:H`,
    });

    const orders: Order[] = [];
    
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
              total: Number(total),
            });
          } catch (e) {
            console.error(`Error parsing products for order ${orderId}:`, e);
          }
        }
      });
    }

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Error al obtener órdenes" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

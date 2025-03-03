import type { APIRoute } from "astro";
import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from "../../../utils/google-sheets";
import type { Order } from "../../../types/inventory";

export const GET: APIRoute = async ({ params }) => {
  try {
    const { orderId } = params;
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A2:H`,
    });

    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const orderRow = response.data.values.find(row => row[0] === orderId);
    if (!orderRow) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const [id, date, status, customerName, customerEmail, productsJson, total] = orderRow;
    let products = [];
    try {
      products = JSON.parse(productsJson);
    } catch (e) {
      console.error(`Error parsing products for order ${orderId}:`, e);
    }

    const order: Order = {
      orderId: id,
      date,
      status,
      customerName,
      customerEmail,
      products,
      total: parseFloat(total),
    };

    return new Response(JSON.stringify(order), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Error al obtener la orden" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const { orderId } = params;
    const updateData = await request.json();
    const sheets = await getGoogleSheetsClient();

    // Buscar la orden
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!A2:H`,
    });

    if (!response.data.values) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    const rowIndex = response.data.values.findIndex(row => row[0] === orderId);
    if (rowIndex === -1) {
      return new Response(
        JSON.stringify({ error: "Orden no encontrada" }),
        { status: 404, headers: { "Content-Type": "application/json" } },
      );
    }

    // Actualizar el estado de la orden
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.ORDERS}!C${rowIndex + 2}`,
      valueInputOption: "RAW",
      requestBody: {
        values: [[updateData.status]],
      },
    });

    return new Response(
      JSON.stringify({ success: true, message: "Estado actualizado correctamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Error al actualizar la orden" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

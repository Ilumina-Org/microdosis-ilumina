import type { APIRoute } from "astro";
import { paymentDataSchema } from "../../utils/validation-schema";
import type { z } from "astro/zod";
import {
  getGoogleSheetsClient,
  SPREADSHEET_ID,
  SHEETS,
  ensureSheetExists,
} from "../../utils/google-sheets";

const SHEET_NAME = "Ordenes";
const HEADERS = [
  "Fecha",
  "ID de Pago",
  "Estado",
  "ID de Orden",
  "Nombre",
  "Email",
  "Teléfono",
  "Dirección",
  "Ciudad",
  "Estado/Provincia",
  "Código Postal",
  "País",
];

export const POST: APIRoute = async ({ request }) => {
  try {
    let data;
    try {
      const rawData = await request.json();

      const parsedData = paymentDataSchema.safeParse(rawData);

      if (!parsedData.success) {
        const errors = parsedData.error.format();
        return new Response(
          JSON.stringify({
            error: "Datos de entrada inválidos",
            details: formatZodErrors(parsedData.error),
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      data = parsedData.data;
    } catch (error) {
      return new Response(
        JSON.stringify({
          error: "Datos de entrada inválidos o mal formateados",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const sheets = await getGoogleSheetsClient();

    await ensureSheetExists(sheets, SHEET_NAME, HEADERS);

    const values = [
      [
        new Date().toISOString(),
        sanitizeInput(data.paymentId),
        sanitizeInput(data.status),
        sanitizeInput(data.merchantOrderId),
        sanitizeInput(data.shippingAddress.name),
        sanitizeInput(data.shippingAddress.email),
        sanitizeInput(data.shippingAddress.phone),
        sanitizeInput(data.shippingAddress.address),
        sanitizeInput(data.shippingAddress.city),
        sanitizeInput(data.shippingAddress.state),
        sanitizeInput(data.shippingAddress.zipCode),
        sanitizeInput(data.shippingAddress.country),
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    const recordId = generateRecordId();

    if (data.items && Array.isArray(data.items)) {
      const inventoryResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEETS.INVENTORY}!A2:E`,
      });

      if (inventoryResponse.data.values) {
        for (const item of data.items) {
          const rowIndex = inventoryResponse.data.values.findIndex(
            (row) => row[0] === item.sku,
          );
          if (rowIndex !== -1) {
            const currentStock =
              Number(inventoryResponse.data.values[rowIndex][1]) || 0;
            const newStock = Math.max(0, currentStock - item.quantity);

            await sheets.spreadsheets.values.update({
              spreadsheetId: SPREADSHEET_ID,
              range: `${SHEETS.INVENTORY}!B${rowIndex + 2}`,
              valueInputOption: "USER_ENTERED",
              requestBody: {
                values: [[newStock]],
              },
            });
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Datos guardados correctamente",
        recordId: recordId,
        updatedRows: response.data.updates?.updatedRows || 0,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Error al procesar la solicitud",
        message: error.message
          ? error.message.substring(0, 100)
          : "Error desconocido",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

function sanitizeInput(input: unknown): string {
  if (input === undefined || input === null) return "";
  return String(input)
    .replace(/[=+\-@]/g, "")
    .trim();
}

function formatZodErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};

  function processError(err: any, path: string = "") {
    if (err.issues) {
      err.issues.forEach((issue: any) => {
        const fieldPath = path
          ? `${path}.${issue.path.join(".")}`
          : issue.path.join(".");
        result[fieldPath] = issue.message;
      });
    } else if (typeof err === "object") {
      Object.entries(err).forEach(([key, value]) => {
        if (key !== "_errors") {
          const newPath = path ? `${path}.${key}` : key;
          processError(value, newPath);
        }
      });
    }
  }

  processError(error);
  return result;
}

function generateRecordId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `rec_${timestamp}_${random}`;
}

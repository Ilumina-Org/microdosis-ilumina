import type { APIRoute } from "astro";
import { google } from "googleapis";
import { paymentDataSchema } from "../../utils/validation-schema";
import { logger } from "../../utils/logger";
import {
  sendAdminNotification,
  sendConfirmationEmail,
} from "../../utils/mailer";

interface Env {
  PAYMENTS_KV: KVNamespace;
}

const SPREADSHEET_ID = import.meta.env.SPREADSHEET_ID;
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

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals.runtime.env as Env) || {};

  try {
    logger.info("Iniciando endpoint POST /api/save-payment");

    // Validación de datos
    let data;
    try {
      const rawData = await request.json();
      logger.debug("Datos recibidos:", rawData);

      const parsedData = paymentDataSchema.safeParse(rawData);
      if (!parsedData.success) {
        logger.warn("Validación fallida:", parsedData.error);
        return errorResponse(400, "Datos inválidos", parsedData.error);
      }
      data = parsedData.data;
    } catch (error) {
      logger.error("Error al procesar el JSON:", error);
      return errorResponse(400, "Datos mal formateados");
    }

    // Autenticación con Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: import.meta.env.GOOGLE_CLIENT_EMAIL,
        private_key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await ensureSheetWithHeaders(sheets, SPREADSHEET_ID, "Pagos", HEADERS);

    const values = [
      [
        new Date().toISOString(),
        sanitizeInput(data.paymentId),
        sanitizeInput(data.status),
        sanitizeInput(data.merchantOrderId),
        ...Object.values(data.shippingAddress).map(sanitizeInput),
      ],
    ];

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Pagos!A1",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    // Guardar en KV
    const recordId = generateRecordId();
    await env.PAYMENTS_KV.put(recordId, JSON.stringify(data), {
      expirationTtl: 86400, // 24 horas
    });

    try {
      await Promise.all([
        sendConfirmationEmail(data.shippingAddress.email, data),
        sendAdminNotification(data),
      ]);
      logger.info("Emails enviados correctamente");
    } catch (emailError) {
      logger.error("Error enviando emails:", emailError);
    }

    return successResponse({
      success: true,
      recordId,
      updatedRows: response.data.updates?.updatedRows || 0,
    });
  } catch (error: any) {
    logger.error("Error general:", error);
    return errorResponse(500, "Error interno del servidor", error);
  }
};

// Funciones auxiliares
function sanitizeInput(input: unknown): string {
  return String(input ?? "")
    .replace(/[=+\-@]/g, "")
    .trim();
}

function generateRecordId(): string {
  return `rec_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function errorResponse(status: number, message: string, error?: any) {
  logger[status >= 500 ? "error" : "warn"](
    `Respuesta ${status}: ${message}`,
    error,
  );
  return new Response(
    JSON.stringify({
      error: message,
      details: error?.message ? formatErrorDetails(error) : undefined,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}

function successResponse(data: any) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function formatErrorDetails(error: any) {
  return {
    message: error.message?.substring(0, 100),
    code: error.code,
    stack: import.meta.env.DEV ? error.stack : undefined,
  };
}

async function ensureSheetWithHeaders(
  sheets: any,
  spreadsheetId: string,
  sheetTitle: string,
  headers: string[],
): Promise<void> {
  try {
    const { data } = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetExists = data.sheets.some(
      (sheet: any) => sheet.properties.title === sheetTitle,
    );

    if (!sheetExists) {
      logger.info(`Creando hoja: ${sheetTitle}`);
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: { title: sheetTitle },
              },
            },
          ],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetTitle}!A1:L1`,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [headers] },
      });
    }
  } catch (error) {
    logger.error("Error configurando hoja:", error);
    throw error;
  }
}

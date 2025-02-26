import type { APIRoute } from "astro";
import { google } from "googleapis";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { paymentDataSchema } from "../../utils/validation-schema";
import { logger } from "../../utils/logger";
import type { z } from "astro/zod";
import { sendConfirmationEmail } from "../../utils/mailer";

const SPREADSHEET_ID = "1g5rj4fIyg0DU9NQuAxN3iBedjPA5aBSgnZZCAHXJr9M";
const SHEET_NAME = "Pagos";
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const POST: APIRoute = async ({ request }) => {
  try {
    logger.info("Iniciando endpoint POST /api/save-payment");

    let data;
    try {
      const rawData = await request.json();
      logger.debug("Datos recibidos:", rawData);

      const parsedData = paymentDataSchema.safeParse(rawData);

      if (!parsedData.success) {
        const errors = parsedData.error.format();
        logger.warn("Validación fallida:", errors);

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
      logger.error("Error al procesar el JSON:", error);

      return new Response(
        JSON.stringify({
          error: "Datos de entrada inválidos o mal formateados",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const keyFilePath = path.resolve(__dirname, "../../../credentials.json");
    if (!fs.existsSync(keyFilePath)) {
      logger.error("Archivo de credenciales no encontrado en:", keyFilePath);

      return new Response(
        JSON.stringify({
          error: "Error de configuración: credenciales no encontradas",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const auth = new google.auth.GoogleAuth({
      keyFile: keyFilePath,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    await ensureSheetWithHeaders(sheets, SPREADSHEET_ID, SHEET_NAME, HEADERS);

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

    saveLocalRecord(recordId, data);

    try {
      await sendConfirmationEmail(data.shippingAddress.email, data);
      logger.info("Correo de confirmación enviado correctamente");
    } catch (emailError) {
      logger.error("Error al enviar correo de confirmación:", emailError);
    }

    logger.info("Datos guardados exitosamente:", response.data);

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
    logger.error("Error al guardar en Google Sheets:", error);

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

function saveLocalRecord(recordId: string, data: any): void {
  try {
    const cacheDir = path.resolve(__dirname, "../../../.cache/records");

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    const recordPath = path.join(cacheDir, `${recordId}.json`);

    fs.writeFileSync(
      recordPath,
      JSON.stringify(
        {
          timestamp: new Date().toISOString(),
          recordId,
          data,
        },
        null,
        2,
      ),
    );

    logger.debug(`Registro local guardado: ${recordPath}`);

    cleanupOldRecords(cacheDir);
  } catch (error) {
    logger.warn("No se pudo guardar registro local:", error);
  }
}

function cleanupOldRecords(cacheDir: string): void {
  try {
    const files = fs.readdirSync(cacheDir);
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;

    files.forEach((file) => {
      const filePath = path.join(cacheDir, file);
      const stats = fs.statSync(filePath);

      if (now - stats.mtimeMs > oneDayMs) {
        fs.unlinkSync(filePath);
        logger.debug(`Eliminado registro antiguo: ${file}`);
      }
    });
  } catch (error) {
    logger.warn("Error al limpiar registros antiguos:", error);
  }
}

async function ensureSheetWithHeaders(
  sheets: any,
  spreadsheetId: string,
  sheetTitle: string,
  headers: string[],
): Promise<void> {
  try {
    const res = await sheets.spreadsheets.get({ spreadsheetId });
    let sheetId = null;
    let sheetExists = false;

    for (const sheet of res.data.sheets) {
      if (sheet.properties.title === sheetTitle) {
        sheetExists = true;
        sheetId = sheet.properties.sheetId;
        break;
      }
    }

    if (!sheetExists) {
      logger.info(`La hoja "${sheetTitle}" no existe. Creándola...`);

      const addResponse = await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                },
              },
            },
          ],
        },
      });

      sheetId = addResponse.data.replies[0].addSheet.properties.sheetId;
      logger.info(`Hoja "${sheetTitle}" creada con ID: ${sheetId}`);

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${sheetTitle}!A1:L1`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [headers],
        },
      });

      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: {
                  sheetId,
                  startRowIndex: 0,
                  endRowIndex: 1,
                },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: {
                      red: 0.8,
                      green: 0.8,
                      blue: 0.8,
                    },
                    textFormat: {
                      bold: true,
                    },
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat)",
              },
            },
            {
              updateSheetProperties: {
                properties: {
                  sheetId,
                  gridProperties: {
                    frozenRowCount: 1,
                  },
                },
                fields: "gridProperties.frozenRowCount",
              },
            },
          ],
        },
      });

      logger.info("Encabezados formateados correctamente");
    } else {
      const headerData = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetTitle}!A1:L1`,
      });

      if (
        !headerData.data.values ||
        !arraysEqual(headerData.data.values[0], headers)
      ) {
        logger.info("Actualizando encabezados...");

        await sheets.spreadsheets.values.update({
          spreadsheetId,
          range: `${sheetTitle}!A1:L1`,
          valueInputOption: "USER_ENTERED",
          requestBody: {
            values: [headers],
          },
        });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      logger.error("Error al configurar la hoja:", error);
      throw new Error(`Error al configurar la hoja: ${error.message}`);
    } else {
      logger.error("Error al configurar la hoja:", error);
      throw new Error(`Error al configurar la hoja: ${error}`);
    }
  }
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }

  return true;
}

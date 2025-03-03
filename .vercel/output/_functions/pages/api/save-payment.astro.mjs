import 'path';
import { z } from 'zod';
import { Resend } from 'resend';
import { g as getGoogleSheetsClient, a as SPREADSHEET_ID, S as SHEETS } from '../../chunks/google-sheets_TmfKgee1.mjs';
export { renderers } from '../../renderers.mjs';

const shippingAddressSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }).max(100),
  email: z.string().email({ message: "Email inválido" }).max(100),
  phone: z.string().min(7, { message: "Número de teléfono demasiado corto" }).max(20).regex(/^[+]?[\d\s()-]{7,20}$/, {
    message: "Formato de teléfono inválido"
  }),
  address: z.string().min(5, { message: "La dirección es demasiado corta" }).max(200),
  city: z.string().min(2, { message: "La ciudad es demasiado corta" }).max(100),
  state: z.string().min(2, { message: "La provincia/estado es demasiado corta" }).max(100),
  zipCode: z.string().min(3, { message: "Código postal inválido" }).max(20),
  country: z.string().min(2, { message: "País inválido" }).max(100)
});
const paymentDataSchema = z.object({
  paymentId: z.string().min(3, { message: "ID de pago inválido" }),
  status: z.enum(["pending", "completed", "failed", "processing"], {
    errorMap: () => ({ message: "Estado de pago inválido" })
  }),
  merchantOrderId: z.string().min(3, { message: "ID de orden inválido" }),
  shippingAddress: shippingAddressSchema
});

const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const LOG_LEVEL_PRIORITY = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3
};
const COLORS = {
  reset: "\x1B[0m",
  debug: "\x1B[36m",
  // Cyan
  info: "\x1B[32m",
  // Verde
  warn: "\x1B[33m",
  // Amarillo
  error: "\x1B[31m"
  // Rojo
};
class Logger {
  constructor() {
  }
  // Método principal de log
  log(level, message, ...args) {
    if (LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[LOG_LEVEL]) {
      const timestamp = (/* @__PURE__ */ new Date()).toISOString();
      const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;
      const formattedArgs = args.map(
        (arg) => typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg
      );
      if (level === "error") {
        console.error(
          `${COLORS[level]}${logMessage}${COLORS.reset}`,
          ...formattedArgs
        );
      } else {
        console.log(
          `${COLORS[level]}${logMessage}${COLORS.reset}`,
          ...formattedArgs
        );
      }
    }
  }
  // Métodos públicos para cada nivel de log
  debug(message, ...args) {
    this.log("debug", message, ...args);
  }
  info(message, ...args) {
    this.log("info", message, ...args);
  }
  warn(message, ...args) {
    this.log("warn", message, ...args);
  }
  error(message, ...args) {
    this.log("error", message, ...args);
  }
}
const logger = new Logger();

const resend = new Resend("re_123456789");
async function sendConfirmationEmail(to, data) {
  await resend.emails.send({
    from: "Tu Empresa <no-reply@tudominio.com>",
    // Cambia por tu dominio verificado en Resend
    to,
    subject: "Confirmación de Registro - Tu Orden ha sido Procesada",
    html: `
      <h1>Hola ${data.shippingAddress.name},</h1>
      <p>¡Gracias por tu compra! Hemos recibido tus datos correctamente y estamos procesando tu pedido.</p>
      <h3>Detalles del Pedido:</h3>
      <ul>
        <li><strong>ID de Pago:</strong> ${data.paymentId}</li>
        <li><strong>Estado:</strong> ${data.status}</li>
        <li><strong>Dirección de Envío:</strong> ${data.shippingAddress.address}</li>
      </ul>
      <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
      <p>Saludos,<br>Tu Empresa</p>
    `
  });
}
async function sendAdminNotification(data) {
  await resend.emails.send({
    from: "Sistema de Órdenes <no-reply@tudominio.com>",
    // Cambia por tu dominio verificado en Resend
    to: "lucasan.videla@gmail.com",
    // Email del administrador
    subject: `Nueva Orden Recibida - ${data.merchantOrderId}`,
    html: `
      <h1 style="color: #ff5722;">¡Nueva orden requiere atención!</h1>
      <h3>Datos del Cliente:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${data.shippingAddress.name}</li>
        <li><strong>Email:</strong> ${data.shippingAddress.email}</li>
        <li><strong>Teléfono:</strong> ${data.shippingAddress.phone}</li>
      </ul>
      <h3>Dirección de Envío:</h3>
      <p>
        ${data.shippingAddress.address}<br>
        ${data.shippingAddress.city}, ${data.shippingAddress.state}<br>
        ${data.shippingAddress.zipCode}, ${data.shippingAddress.country}
      </p>
      <h3>Detalles de Pago:</h3>
      <table border="1" cellpadding="5" style="border-collapse: collapse;">
        <tr>
          <th>ID de Pago</th>
          <th>Estado</th>
          <th>ID de Orden</th>
          <th>Fecha</th>
        </tr>
        <tr>
          <td>${data.paymentId}</td>
          <td style="color: ${data.status === "approved" ? "green" : "red"};">${data.status}</td>
          <td>${data.merchantOrderId}</td>
          <td>${(/* @__PURE__ */ new Date()).toLocaleDateString()}</td>
        </tr>
      </table>
      <p style="margin-top: 20px; color: #666;">
        Este pedido fue registrado el ${(/* @__PURE__ */ new Date()).toLocaleString()}
      </p>
    `
  });
}

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
  "País"
];
const POST = async ({ request }) => {
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
            details: formatZodErrors(parsedData.error)
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      data = parsedData.data;
    } catch (error) {
      logger.error("Error al procesar el JSON:", error);
      return new Response(
        JSON.stringify({
          error: "Datos de entrada inválidos o mal formateados"
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const sheets = await getGoogleSheetsClient();
    await ensureSheetExists(sheets, SHEET_NAME, HEADERS);
    const values = [
      [
        (/* @__PURE__ */ new Date()).toISOString(),
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
        sanitizeInput(data.shippingAddress.country)
      ]
    ];
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values }
    });
    const recordId = generateRecordId();
    if (data.items && Array.isArray(data.items)) {
      const inventoryResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${SHEETS.INVENTORY}!A2:E`
      });
      if (inventoryResponse.data.values) {
        for (const item of data.items) {
          const rowIndex = inventoryResponse.data.values.findIndex(
            (row) => row[0] === item.sku
          );
          if (rowIndex !== -1) {
            const currentStock = Number(inventoryResponse.data.values[rowIndex][1]) || 0;
            const newStock = Math.max(0, currentStock - item.quantity);
            await sheets.spreadsheets.values.update({
              spreadsheetId: SPREADSHEET_ID,
              range: `${SHEETS.INVENTORY}!B${rowIndex + 2}`,
              valueInputOption: "USER_ENTERED",
              requestBody: {
                values: [[newStock]]
              }
            });
          }
        }
      }
    }
    try {
      await sendConfirmationEmail(data.shippingAddress.email, data);
      logger.info("Correo de confirmación enviado correctamente");
      await sendAdminNotification(data);
      logger.info("Correo al administrador enviado correctamente");
    } catch (emailError) {
      logger.error("Error al enviar correo de confirmación:", emailError);
    }
    logger.info("Datos guardados exitosamente:", response.data);
    return new Response(
      JSON.stringify({
        success: true,
        message: "Datos guardados correctamente",
        recordId,
        updatedRows: response.data.updates?.updatedRows || 0
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    logger.error("Error al guardar en Google Sheets:", error);
    return new Response(
      JSON.stringify({
        error: "Error al procesar la solicitud",
        message: error.message ? error.message.substring(0, 100) : "Error desconocido"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
function sanitizeInput(input) {
  if (input === void 0 || input === null) return "";
  return String(input).replace(/[=+\-@]/g, "").trim();
}
function formatZodErrors(error) {
  const result = {};
  function processError(err, path2 = "") {
    if (err.issues) {
      err.issues.forEach((issue) => {
        const fieldPath = path2 ? `${path2}.${issue.path.join(".")}` : issue.path.join(".");
        result[fieldPath] = issue.message;
      });
    } else if (typeof err === "object") {
      Object.entries(err).forEach(([key, value]) => {
        if (key !== "_errors") {
          const newPath = path2 ? `${path2}.${key}` : key;
          processError(value, newPath);
        }
      });
    }
  }
  processError(error);
  return result;
}
function generateRecordId() {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1e4);
  return `rec_${timestamp}_${random}`;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

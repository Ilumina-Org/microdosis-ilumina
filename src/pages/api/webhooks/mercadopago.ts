import type { APIRoute } from "astro";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { HmacSHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

export const POST: APIRoute = async ({ request }) => {
  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.MP_ACCESS_TOKEN,
  });

  try {
    const body = await request.text();
    const signature = request.headers.get("x-signature");
    const timestamp = request.headers.get("x-request-timestamp");

    if (!signature || !timestamp) {
      console.error("Faltan headers de validación");
      return new Response(null, { status: 401 });
    }

    const secret = import.meta.env.MP_ACCESS_TOKEN.split("_")[1];
    const generatedSignature = Base64.stringify(
      HmacSHA256(`${timestamp}:${body}`, secret),
    );

    if (generatedSignature !== signature) {
      console.error("Firma inválida");
      return new Response(null, { status: 401 });
    }

    const data = JSON.parse(body);

    if (data.type === "payment") {
      const payment = await new Payment(client).get({ id: data.data.id });
      console.log("Estado del pago:", payment.status);

      if (payment.status === "approved") {
        console.log("Pago exitoso:", payment.id);
      }
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error en webhook:", error);
    return new Response(null, { status: 500 });
  }
};

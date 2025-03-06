export const prerender = false;
import { MercadoPagoConfig, Preference } from "mercadopago";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.MP_ACCESS_TOKEN,
  });

  try {
    const { name, price, quantity, district } = await request.json();

    if (!name || typeof price !== "number" || typeof quantity !== "number") {
      throw new Error("Datos inválidos: name, price y quantity son requeridos");
    }

    const itemId =
      Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const mpPayload = {
      items: [
        {
          id: itemId,
          title: name.substring(0, 256),
          description: `Envío a ${district}`,
          category_id: "services",
          quantity: Number(quantity),
          currency_id: "USD",
          unit_price: parseFloat(price.toFixed(2)),
        },
      ],
      payer: {
        name: "Cliente",
        surname: "Microdosis",
      },
      payment_methods: {
        excluded_payment_types: [{ id: "atm" }],
        installments: 1,
      },
      back_urls: {
        success: `${import.meta.env.SITE}/success`,
        failure: `${import.meta.env.SITE}/failure`,
        pending: `${import.meta.env.SITE}/pending`,
      },
      auto_return: "approved",
      notification_url: `${import.meta.env.SITE}/api/webhook`,
      statement_descriptor: "MICRODOSIS.ILUMI",
      external_reference: `ORDER-${itemId}`,
    };

    console.log("Payload a MercadoPago:", JSON.stringify(mpPayload, null, 2));

    const preference = await new Preference(client).create({
      body: mpPayload,
    });

    return new Response(JSON.stringify({ id: preference.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(
      "Error completo:",
      JSON.stringify(error, Object.getOwnPropertyNames(error)),
    );

    return new Response(
      JSON.stringify({
        error: "Error procesando el pago",
        code: "MP_ERROR",
        details: error instanceof Error ? error.message : "Error desconocido",
      }),
      { status: 500 },
    );
  }
};

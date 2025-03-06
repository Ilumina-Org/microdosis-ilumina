export const prerender = false;
import { MercadoPagoConfig, Preference } from "mercadopago";
import type { APIRoute } from "astro";

interface RequestBody {
  name: string;
  price: number;
  quantity: number;
  order_id: string; // Nuevo campo
}

export const POST: APIRoute = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  const { name, price, quantity, order_id }: RequestBody = await request.json();

  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.MP_ACCESS_TOKEN,
  });

  try {
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: crypto.randomUUID(),
            title: name,
            unit_price: Number(price),
            quantity: Number(quantity),
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `${import.meta.env.SITE}/success`,
          failure: `${import.meta.env.SITE}/failure`,
          pending: `${import.meta.env.SITE}/pending`,
        },
        auto_return: "approved",
        notification_url:
          "https://webhook.site/139937f9-ca25-4976-a8f4-8d69833b2676", // Tu URL de webhook
        external_reference: order_id, // ID único generado en el cliente
      },
    });

    if (!preference.id) {
      throw new Error("Preference ID not found");
    }

    return new Response(JSON.stringify({ id: preference.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

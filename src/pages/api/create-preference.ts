// src/routes/api/create-preference.ts
export const prerender = false;
import { MercadoPagoConfig, Preference } from "mercadopago";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const client = new MercadoPagoConfig({
    accessToken: import.meta.env.MP_ACCESS_TOKEN,
  });

  try {
    const { name, price, quantity } = await request.json();

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: crypto.randomUUID(),
            title: name,
            unit_price: Number(price),
            quantity: Number(quantity),
            currency_id: "PEN",
          },
        ],
        back_urls: {
          success: `${import.meta.env.SITE}/success`,
          failure: `${import.meta.env.SITE}/failure`,
        },
      },
    });

    return new Response(JSON.stringify({ id: preference.id }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Error",
      }),
      { status: 500 },
    );
  }
};

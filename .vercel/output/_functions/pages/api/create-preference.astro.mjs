import { MercadoPagoConfig, Preference } from 'mercadopago';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }
  const { name, price, quantity } = await request.json();
  const client = new MercadoPagoConfig({
    accessToken: "APP_USR-6353876754814983-022613-7030ead9802e17d4e5fe9ce99333f30b-2289426322"
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
            currency_id: "ARS"
          }
        ],
        back_urls: {
          success: `${"http://localhost:4321"}/success`,
          failure: `${"http://localhost:4321"}/failure`,
          pending: `${"http://localhost:4321"}/pending`
        },
        auto_return: "approved"
      }
    });
    if (!preference.id) {
      throw new Error("Preference ID not found");
    }
    return new Response(JSON.stringify({ id: preference.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error creating preference:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

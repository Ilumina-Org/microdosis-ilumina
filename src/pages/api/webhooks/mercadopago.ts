import type { APIRoute } from "astro";

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    console.log("📦 Webhook recibido:", JSON.stringify(data, null, 2));

    return new Response(null, { status: 200 });
  } catch (error) {
    console.error("Error en webhook:", error);
    return new Response(null, { status: 500 });
  }
};

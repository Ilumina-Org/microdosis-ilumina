import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  try {
    const {
      token,
      amount,
      email,
      capture = true,
      currency_code = "PEN",
      description,
      antifraud_details,
      metadata,
      installments,
    } = await request.json();

    if (!token || !amount || !email) {
      throw new Error("Faltan parámetros necesarios.");
    }

    const culqiSecretKey = import.meta.env.CULQI_SECRET_KEY;

    const response = await fetch("https://api.culqi.com/v2/charges", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${culqiSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency_code,
        email,
        source_id: token,
        capture,
        description,
        installments,
        antifraud_details,
        metadata,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.user_message || "Error procesando el pago");
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Error en el pago:", error);

    const message =
      error instanceof Error ? error.message : "Error desconocido";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

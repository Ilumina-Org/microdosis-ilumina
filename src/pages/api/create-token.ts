import type { APIRoute } from "astro";

export const prerender = false;

import Culqi from "culqi-node";

export const POST: APIRoute = async ({ request }) => {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204 });
  }

  try {
    const {
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      metadata,
    } = await request.json();

    if (
      !card_number ||
      !cvv ||
      !expiration_month ||
      !expiration_year ||
      !email
    ) {
      throw new Error("Faltan parámetros necesarios para crear el token.");
    }

    const culqi = new Culqi({
      privateKey: import.meta.env.CULQI_SECRET_KEY,
      pciCompliant: true,
      publicKey: import.meta.env.CULQI_PUBLIC_KEY,
    });

    const token = await culqi.tokens.createToken({
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email,
      metadata,
    });

    return new Response(JSON.stringify(token), { status: 201 });
  } catch (error) {
    console.error("Error al crear el token:", error);

    const message =
      error instanceof Error ? error.message : "Error desconocido";

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
    });
  }
};

import type { APIRoute } from "astro";
import { getProducts } from "../../utils/stock";

export const GET: APIRoute = async ({ request }) => {
  try {
    const products = await getProducts();

    if (!products || products.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No se encontraron productos en el inventario.",
          code: "NO_PRODUCTS_FOUND",
        }),
        { status: 404 },
      );
    }

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error("Error fetching products:", error);
    return new Response(
      JSON.stringify({
        error: "Error de servidor al obtener los productos.",
        code: "SERVER_ERROR",
        details: error.message?.substring(0, 100) || "Error desconocido",
      }),
      { status: 500 },
    );
  }
};

import type { APIRoute } from "astro";
import { getStock } from "../../utils/stock";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return new Response(
        JSON.stringify({
          error: "Se requiere el ID del producto",
          code: "MISSING_PRODUCT_ID",
        }),
        { status: 400 },
      );
    }

    const stockData = await getStock();

    const productStock = stockData[productId];

    if (!productStock) {
      return new Response(
        JSON.stringify({
          error: "Producto no encontrado",
          code: "PRODUCT_NOT_FOUND",
        }),
        { status: 404 },
      );
    }

    return new Response(
      JSON.stringify({
        sku: productId,
        available: productStock.disponible,
        reserved: productStock.reservado,
        total: productStock.total,
        notes: productStock.notas,
        canPurchase: productStock.disponible > 0,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error en el endpoint check-stock:", error);
    return new Response(
      JSON.stringify({
        error: "Error de servidor",
        code: "SERVER_ERROR",
        details: error.message?.substring(0, 100) || "Error desconocido",
      }),
      { status: 500 },
    );
  }
};

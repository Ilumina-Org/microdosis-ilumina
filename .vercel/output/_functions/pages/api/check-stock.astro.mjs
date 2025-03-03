import { g as getStock } from '../../chunks/stock_Dxk2z7az.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const productId = url.searchParams.get("productId");
    if (!productId) {
      return new Response(
        JSON.stringify({
          error: "Se requiere el ID del producto",
          code: "MISSING_PRODUCT_ID"
        }),
        { status: 400 }
      );
    }
    const stockData = await getStock();
    const productStock = stockData[productId];
    if (!productStock) {
      return new Response(
        JSON.stringify({
          error: "Producto no encontrado",
          code: "PRODUCT_NOT_FOUND"
        }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({
        sku: productId,
        available: productStock.disponible,
        reserved: productStock.reservado,
        total: productStock.total,
        notes: productStock.notas,
        canPurchase: productStock.disponible > 0
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en el endpoint check-stock:", error);
    return new Response(
      JSON.stringify({
        error: "Error de servidor",
        code: "SERVER_ERROR",
        details: error.message?.substring(0, 100) || "Error desconocido"
      }),
      { status: 500 }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import {
  getGoogleSheetsClient,
  SPREADSHEET_ID,
  SHEETS,
} from "../../utils/google-sheets";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`,
    });

    if (!response.data.values || response.data.values.length === 0) {
      return new Response(
        JSON.stringify({
          error: "No se encontraron productos en el inventario.",
          code: "NO_PRODUCTS_FOUND",
        }),
        { status: 404 },
      );
    }

    const products = response.data.values.map((row) => {
      const [
        sku,
        title,
        price,
        regularPrice,
        imageUrl, // Eliminado
        tier,
        link,
        disponible,
        reservado,
        total,
        notas,
        featured,
        tipo,
      ] = row;

      const numDisponible = parseInt(disponible, 10);
      const numReservado = parseInt(reservado, 10);
      const numTotal = parseInt(total, 10);

      const disponibleFinal = isNaN(numDisponible) ? 0 : numDisponible;
      const reservadoFinal = isNaN(numReservado) ? 0 : numReservado;
      const totalFinal = isNaN(numTotal)
        ? disponibleFinal + reservadoFinal
        : numTotal;

      return {
        sku: sku.trim(),
        title: title || "",
        productDetail: `Precio Regular $${parseFloat(regularPrice) || 0}`,
        productPrice: `$${parseFloat(price) || 0}`,
        productDeal:
          totalFinal > 0
            ? `(Ahorra ${Math.round((1 - parseFloat(price) / parseFloat(regularPrice)) * 100)}%)`
            : "",
        tier: parseInt(tier, 10) || 0,
        stock: disponibleFinal > 0,
        tipo: tipo === "subscription" ? "subscription" : "package",
      };
    });

    return new Response(JSON.stringify(products), { status: 200 });
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

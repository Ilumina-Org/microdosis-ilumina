import type { APIRoute } from "astro";
import { getGoogleSheetsClient, SPREADSHEET_ID, SHEETS } from "../../../utils/google-sheets";
import type { StockItem } from "../../../types/inventory";

export const GET: APIRoute = async () => {
  try {
    const sheets = await getGoogleSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:M`,
    });

    const inventory: Record<string, StockItem> = {};
    
    if (response.data.values) {
      response.data.values.forEach((row) => {
        const [
          sku,
          title,
          price,
          regularPrice,
          imageUrl,
          tier,
          link,
          disponible,
          reservado,
          total,
          notas,
          featured,
          tipo
        ] = row;

        if (sku?.trim()) {
          inventory[sku] = {
            sku: sku.trim(),
            title: title || '',
            price: parseFloat(price) || 0,
            regularPrice: parseFloat(regularPrice) || 0,
            imageUrl: imageUrl || '',
            tier: parseInt(tier, 10) || 0,
            link: link || '',
            disponible: parseInt(disponible, 10) || 0,
            reservado: parseInt(reservado, 10) || 0,
            total: parseInt(total, 10) || 0,
            notas: notas || '',
            featured: featured === 'true',
            tipo: (tipo === 'subscription' ? 'subscription' : 'package') as 'package' | 'subscription'
          };
        }
      });
    }

    return new Response(JSON.stringify(inventory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Error al obtener inventario" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const product = await request.json() as StockItem;
    const sheets = await getGoogleSheetsClient();

    // Validar datos requeridos
    if (!product.sku || !product.title) {
      return new Response(
        JSON.stringify({ error: 'SKU y título son requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Verificar si el SKU ya existe
    const existingResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2:A`,
    });

    const skuExists = existingResponse.data.values?.some(([sku]) => sku === product.sku);
    if (skuExists) {
      return new Response(
        JSON.stringify({ error: 'El SKU ya existe' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEETS.INVENTORY}!A2`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          product.sku,
          product.title,
          product.price,
          product.regularPrice,
          product.imageUrl,
          product.tier,
          product.link,
          product.disponible,
          product.reservado,
          product.total,
          product.notas,
          product.featured ? 'true' : 'false',
          product.tipo
        ]],
      },
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error al añadir producto" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

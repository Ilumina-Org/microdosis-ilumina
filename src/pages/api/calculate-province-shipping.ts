import type { APIRoute } from "astro";
import { calculateProvinceShippingCost } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const province = url.searchParams.get("location");
  const packageId = url.searchParams.get("packageId");

  const shippingCost = calculateProvinceShippingCost(province, packageId);

  console.log("Province shipping cost:", shippingCost);

  return new Response(
    JSON.stringify({
      success: true,
      shippingCost,
    }),
    {
      headers: { "Content-Type": "application/json" },
    },
  );
};

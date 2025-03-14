import type { APIRoute } from "astro";
import { calculateShippingCost } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const district = url.searchParams.get("location");
  const packageId = url.searchParams.get("packageId");

  const shippingCost = calculateShippingCost(district, packageId);

  console.log("District shipping cost:", shippingCost);

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

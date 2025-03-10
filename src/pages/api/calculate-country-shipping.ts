import type { APIRoute } from "astro";
import {
  calculateCountryShippingCost,
  calculateDepartmentShippingCost,
} from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const country = url.searchParams.get("location");
  const packageId = url.searchParams.get("packageId");

  const shippingCost = calculateCountryShippingCost(country, packageId);

  console.log("Country shipping cost:", shippingCost);

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

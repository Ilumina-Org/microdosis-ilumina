import type { APIRoute } from "astro";
import { calculateDepartmentShippingCost } from "../../utils/shipping";

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const province = url.searchParams.get("location");
  const packageId = url.searchParams.get("packageId");

  const shippingCost = calculateDepartmentShippingCost(province, packageId);

  console.log("Department shipping cost:", shippingCost);

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

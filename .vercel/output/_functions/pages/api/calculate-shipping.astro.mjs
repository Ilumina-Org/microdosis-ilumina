import { c as calculateShippingCost } from '../../chunks/shipping_CatnkRBH.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const district = url.searchParams.get("district");
  url.searchParams.get("packageId");
  const shippingCost = calculateShippingCost(district);
  console.log("Shipping cost:", shippingCost);
  return new Response(
    JSON.stringify({
      success: true,
      shippingCost
    }),
    {
      headers: { "Content-Type": "application/json" }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

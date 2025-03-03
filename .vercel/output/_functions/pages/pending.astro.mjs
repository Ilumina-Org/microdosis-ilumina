import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D3zStpAR.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const $$Pending = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pending;
  const { searchParams } = Astro2.url;
  const paymentId = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const merchantOrderId = searchParams.get("merchant_order_id");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Payment Pending", "data-astro-cid-5z4m7rab": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container" data-astro-cid-5z4m7rab> <h1 class="title" data-astro-cid-5z4m7rab>Payment Pending</h1> <div class="card" data-astro-cid-5z4m7rab> <p class="message" data-astro-cid-5z4m7rab>
Your payment is currently being processed. Please check back
                later for the status.
</p> <ul class="details" data-astro-cid-5z4m7rab> <li data-astro-cid-5z4m7rab>Payment ID: ${paymentId}</li> <li data-astro-cid-5z4m7rab>Status: ${status}</li> <li data-astro-cid-5z4m7rab>Merchant Order ID: ${merchantOrderId}</li> </ul> <a href="/" class="button primary" data-astro-cid-5z4m7rab>Return to Home</a> </div> </main> ` })} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/pending.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/pending.astro";
const $$url = "/pending";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Pending,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

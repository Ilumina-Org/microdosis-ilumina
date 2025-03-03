import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D3zStpAR.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const $$Failure = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Failure;
  const { searchParams } = Astro2.url;
  const paymentId = searchParams.get("payment_id") ?? "N/A";
  const status = searchParams.get("status") ?? "N/A";
  const merchantOrderId = searchParams.get("merchant_order_id") ?? "N/A";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Payment Failed", "data-astro-cid-zyzyzmhw": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container" data-astro-cid-zyzyzmhw> <h1 class="title" data-astro-cid-zyzyzmhw>Payment Failed</h1> <div class="card" data-astro-cid-zyzyzmhw> <p class="message" data-astro-cid-zyzyzmhw>
Lo sentimos, pero no pudimos procesar tu pago. Por favor,
                intenta nuevamente o contacta al soporte si el problema
                persiste.
</p> <ul class="details" data-astro-cid-zyzyzmhw> <li data-astro-cid-zyzyzmhw>Payment ID: ${paymentId}</li> <li data-astro-cid-zyzyzmhw>Status: ${status}</li> <li data-astro-cid-zyzyzmhw>Merchant Order ID: ${merchantOrderId}</li> </ul> <a href="/" class="button primary" data-astro-cid-zyzyzmhw>Return to Home</a> <a href="/contact" class="button secondary" data-astro-cid-zyzyzmhw>Contact Support</a> </div> </main> ` })} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/failure.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/failure.astro";
const $$url = "/failure";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Failure,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

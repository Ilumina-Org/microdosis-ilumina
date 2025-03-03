import { a as createComponent, r as renderComponent, b as renderTemplate } from '../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { N as NotFoundPage } from '../chunks/NotFound_COhUD01L.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "NotFound", NotFoundPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/ReactComponents/NotFound", "client:component-export": "default" })};`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/404.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

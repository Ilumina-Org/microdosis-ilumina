import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as renderSlot } from './astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from './Layout_D3zStpAR.mjs';
/* empty css                             */

const $$Astro = createAstro("http://localhost:4321");
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Admin - ${title}`, "data-astro-cid-2kanml4j": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-layout" data-astro-cid-2kanml4j> <nav class="admin-nav" data-astro-cid-2kanml4j> <a href="/admin/inventory" class="nav-item" data-astro-cid-2kanml4j> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-2kanml4j> <path d="M21 8V21H3V8" data-astro-cid-2kanml4j></path> <path d="M3 4h18l-9 4-9-4z" data-astro-cid-2kanml4j></path> </svg>
Inventario
</a> <a href="/admin/orders" class="nav-item" data-astro-cid-2kanml4j> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-2kanml4j> <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" data-astro-cid-2kanml4j></path> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-2kanml4j></line> <path d="M16 10a4 4 0 0 1-8 0" data-astro-cid-2kanml4j></path> </svg>
Órdenes
</a> </nav> <main class="admin-content" data-astro-cid-2kanml4j> ${renderSlot($$result2, $$slots["default"])} </main> </div> ` })} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };

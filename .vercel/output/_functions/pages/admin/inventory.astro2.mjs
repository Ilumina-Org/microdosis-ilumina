import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CmNwAmQL.mjs';
import { g as getStock } from '../../chunks/stock_CyV-sWuA.mjs';
/* empty css                                        */
export { renderers } from '../../renderers.mjs';

const $$Inventory = createComponent(async ($$result, $$props, $$slots) => {
  const stockData = await getStock();
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Inventario", "data-astro-cid-py43v2fj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="inventory-header" data-astro-cid-py43v2fj> <h1 data-astro-cid-py43v2fj>Gestión de Inventario</h1> <button id="addProductBtn" class="btn-primary" data-astro-cid-py43v2fj> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-py43v2fj> <line x1="12" y1="5" x2="12" y2="19" data-astro-cid-py43v2fj></line> <line x1="5" y1="12" x2="19" y2="12" data-astro-cid-py43v2fj></line> </svg>
Añadir Producto
</button> </div> <div class="inventory-container" data-astro-cid-py43v2fj> <h1 data-astro-cid-py43v2fj>Gestión de Inventario</h1> ${Object.keys(stockData).length > 0 ? renderTemplate`<div class="inventory-cards" data-astro-cid-py43v2fj> ${Object.entries(stockData).map(([sku, stock]) => renderTemplate`<div class="inventory-card" data-astro-cid-py43v2fj> <div class="card-header" data-astro-cid-py43v2fj> <h2 class="sku-title" data-astro-cid-py43v2fj>${sku}</h2> </div> <div class="card-content" data-astro-cid-py43v2fj> <div class="stat-row" data-astro-cid-py43v2fj> <span class="stat-label" data-astro-cid-py43v2fj>
Disponible
</span> <span class="stat-value" data-astro-cid-py43v2fj> ${stock.disponible} </span> </div> <div class="stat-row" data-astro-cid-py43v2fj> <span class="stat-label" data-astro-cid-py43v2fj>
Reservado
</span> <span class="stat-value" data-astro-cid-py43v2fj> ${stock.reservado} </span> </div> <div class="stat-row" data-astro-cid-py43v2fj> <span class="stat-label" data-astro-cid-py43v2fj>Total</span> <span class="stat-value total" data-astro-cid-py43v2fj> ${stock.total} </span> </div> ${stock.notas && renderTemplate`<div class="notes-container" data-astro-cid-py43v2fj> <span class="notes-label" data-astro-cid-py43v2fj>
Notas:
</span> <p class="notes-content" data-astro-cid-py43v2fj> ${stock.notas} </p> </div>`} </div> </div>`)} </div>` : renderTemplate`<div class="no-data-message" data-astro-cid-py43v2fj> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-py43v2fj> <path d="M21 8V21H3V8" data-astro-cid-py43v2fj></path> <path d="M3 4h18l-9 4-9-4z" data-astro-cid-py43v2fj></path> </svg> <p data-astro-cid-py43v2fj>No hay datos de inventario disponibles</p> </div>`} </div> ` })} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory.astro";
const $$url = "/admin/inventory";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Inventory,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

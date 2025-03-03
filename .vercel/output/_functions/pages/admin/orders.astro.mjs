import { a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CmNwAmQL.mjs';
import { g as getGoogleSheetsClient, S as SHEETS, a as SPREADSHEET_ID } from '../../chunks/google-sheets_DG2NWZlR.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Orders = createComponent(async ($$result, $$props, $$slots) => {
  const sheets = await getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.ORDERS}!A2:H`
  });
  const orders = response.data.values ? response.data.values.map((row) => {
    const [orderId, date, status, customerName, customerEmail, productsJson, total] = row;
    let products = [];
    try {
      products = JSON.parse(productsJson);
    } catch (e) {
      console.error(`Error parsing products for order ${orderId}:`, e);
    }
    return {
      orderId,
      date: new Date(date).toLocaleDateString(),
      status,
      customerName,
      customerEmail,
      products,
      total: parseFloat(total)
    };
  }) : [];
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "\xD3rdenes", "data-astro-cid-7cqwybcj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="orders-header" data-astro-cid-7cqwybcj> <h1 data-astro-cid-7cqwybcj>Gestión de Órdenes</h1> <div class="search-container" data-astro-cid-7cqwybcj> <input type="text" id="searchInput" placeholder="Buscar por ID o cliente..." class="search-input" data-astro-cid-7cqwybcj> </div> </div> <div class="orders-container" data-astro-cid-7cqwybcj> ${orders.length > 0 ? renderTemplate`<div class="orders-table-container" data-astro-cid-7cqwybcj> <table class="orders-table" data-astro-cid-7cqwybcj> <thead data-astro-cid-7cqwybcj> <tr data-astro-cid-7cqwybcj> <th data-astro-cid-7cqwybcj>ID</th> <th data-astro-cid-7cqwybcj>Fecha</th> <th data-astro-cid-7cqwybcj>Cliente</th> <th data-astro-cid-7cqwybcj>Estado</th> <th data-astro-cid-7cqwybcj>Total</th> <th data-astro-cid-7cqwybcj>Acciones</th> </tr> </thead> <tbody data-astro-cid-7cqwybcj> ${orders.map((order) => renderTemplate`<tr class="order-row"${addAttribute(order.orderId, "data-order-id")} data-astro-cid-7cqwybcj> <td data-astro-cid-7cqwybcj>${order.orderId}</td> <td data-astro-cid-7cqwybcj>${order.date}</td> <td data-astro-cid-7cqwybcj> <div class="customer-info" data-astro-cid-7cqwybcj> <span data-astro-cid-7cqwybcj>${order.customerName}</span> <span class="customer-email" data-astro-cid-7cqwybcj>${order.customerEmail}</span> </div> </td> <td data-astro-cid-7cqwybcj> <span${addAttribute(`status-badge ${order.status.toLowerCase()}`, "class")} data-astro-cid-7cqwybcj> ${order.status} </span> </td> <td data-astro-cid-7cqwybcj>$${order.total.toFixed(2)}</td> <td data-astro-cid-7cqwybcj> <div class="actions" data-astro-cid-7cqwybcj> <button class="btn-icon view-btn" title="Ver detalles" data-astro-cid-7cqwybcj> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7cqwybcj> <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-astro-cid-7cqwybcj></path> <circle cx="12" cy="12" r="3" data-astro-cid-7cqwybcj></circle> </svg> </button> </div> </td> </tr>`)} </tbody> </table> </div>` : renderTemplate`<div class="no-data-message" data-astro-cid-7cqwybcj> <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-7cqwybcj> <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" data-astro-cid-7cqwybcj></path> <line x1="3" y1="6" x2="21" y2="6" data-astro-cid-7cqwybcj></line> <path d="M16 10a4 4 0 0 1-8 0" data-astro-cid-7cqwybcj></path> </svg> <p data-astro-cid-7cqwybcj>No hay órdenes disponibles</p> </div>`} </div>  <div id="orderModal" class="modal" data-astro-cid-7cqwybcj> <div class="modal-content" data-astro-cid-7cqwybcj> <div class="modal-header" data-astro-cid-7cqwybcj> <h2 data-astro-cid-7cqwybcj>Detalles de la Orden</h2> <button class="close-modal" data-astro-cid-7cqwybcj>&times;</button> </div> <div id="orderDetails" class="order-details" data-astro-cid-7cqwybcj> <!-- El contenido se llenará dinámicamente --> </div> </div> </div> ` })}  ${renderScript($$result, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/orders.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/orders.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/orders.astro";
const $$url = "/admin/orders";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Orders,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

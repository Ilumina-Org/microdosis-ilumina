import { c as createAstro, a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CmNwAmQL.mjs';
import { g as getGoogleSheetsClient, S as SHEETS, a as SPREADSHEET_ID } from '../../../chunks/google-sheets_TmfKgee1.mjs';
/* empty css                                           */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const $$orderId = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$orderId;
  const { orderId } = Astro2.params;
  const sheets = await getGoogleSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEETS.ORDERS}!A2:H`
  });
  let order = null;
  if (response.data.values) {
    const orderRow = response.data.values.find((row) => row[0] === orderId);
    if (orderRow) {
      const [id, date, status, customerName, customerEmail, productsJson, total] = orderRow;
      let products = [];
      try {
        products = JSON.parse(productsJson);
      } catch (e) {
        console.error(`Error parsing products for order ${orderId}:`, e);
      }
      order = {
        orderId: id,
        date: new Date(date).toLocaleDateString(),
        status,
        customerName,
        customerEmail,
        products,
        total: parseFloat(total)
      };
    }
  }
  if (!order) {
    return Astro2.redirect("/admin/orders");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Orden ${orderId}`, "data-astro-cid-zfnhtoxy": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="order-header" data-astro-cid-zfnhtoxy> <div class="header-left" data-astro-cid-zfnhtoxy> <a href="/admin/orders" class="back-button" data-astro-cid-zfnhtoxy> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-zfnhtoxy> <line x1="19" y1="12" x2="5" y2="12" data-astro-cid-zfnhtoxy></line> <polyline points="12 19 5 12 12 5" data-astro-cid-zfnhtoxy></polyline> </svg>
Volver a Órdenes
</a> <h1 data-astro-cid-zfnhtoxy>Orden #${order.orderId}</h1> </div> <div class="status-selector" data-astro-cid-zfnhtoxy> <label for="orderStatus" data-astro-cid-zfnhtoxy>Estado:</label> <select id="orderStatus" class="status-select"${addAttribute(order.status, "value")} data-astro-cid-zfnhtoxy> <option value="pending"${addAttribute(order.status === "pending", "selected")} data-astro-cid-zfnhtoxy>Pendiente</option> <option value="processing"${addAttribute(order.status === "processing", "selected")} data-astro-cid-zfnhtoxy>Procesando</option> <option value="completed"${addAttribute(order.status === "completed", "selected")} data-astro-cid-zfnhtoxy>Completada</option> <option value="cancelled"${addAttribute(order.status === "cancelled", "selected")} data-astro-cid-zfnhtoxy>Cancelada</option> </select> </div> </div> <div class="order-details" data-astro-cid-zfnhtoxy> <div class="detail-card customer-info" data-astro-cid-zfnhtoxy> <h2 data-astro-cid-zfnhtoxy>Información del Cliente</h2> <div class="info-grid" data-astro-cid-zfnhtoxy> <div class="info-item" data-astro-cid-zfnhtoxy> <label data-astro-cid-zfnhtoxy>Nombre:</label> <span data-astro-cid-zfnhtoxy>${order.customerName}</span> </div> <div class="info-item" data-astro-cid-zfnhtoxy> <label data-astro-cid-zfnhtoxy>Email:</label> <span data-astro-cid-zfnhtoxy>${order.customerEmail}</span> </div> <div class="info-item" data-astro-cid-zfnhtoxy> <label data-astro-cid-zfnhtoxy>Fecha:</label> <span data-astro-cid-zfnhtoxy>${order.date}</span> </div> </div> </div> <div class="detail-card products-info" data-astro-cid-zfnhtoxy> <h2 data-astro-cid-zfnhtoxy>Productos</h2> <div class="products-list" data-astro-cid-zfnhtoxy> ${order.products.map((product) => renderTemplate`<div class="product-item" data-astro-cid-zfnhtoxy> <span class="product-sku" data-astro-cid-zfnhtoxy>${product.sku}</span> <span class="product-quantity" data-astro-cid-zfnhtoxy>x${product.quantity}</span> </div>`)} </div> <div class="order-total" data-astro-cid-zfnhtoxy> <span data-astro-cid-zfnhtoxy>Total:</span> <span class="total-amount" data-astro-cid-zfnhtoxy>$${order.total.toFixed(2)}</span> </div> </div> </div> ` })}  ${renderScript($$result, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/orders/[orderId].astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/orders/[orderId].astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/orders/[orderId].astro";
const $$url = "/admin/orders/[orderId]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$orderId,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

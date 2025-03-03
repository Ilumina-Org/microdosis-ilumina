import { a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CmNwAmQL.mjs';
/* empty css                                     */
export { renderers } from '../../../renderers.mjs';

const $$New = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nuevo Producto", "data-astro-cid-tpmfzted": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" data-astro-cid-tpmfzted> <h1 data-astro-cid-tpmfzted>Nuevo Producto</h1> </div> <div class="form-container" data-astro-cid-tpmfzted> <form id="productForm" class="product-form" data-astro-cid-tpmfzted> <div class="form-grid" data-astro-cid-tpmfzted> <div class="form-group" data-astro-cid-tpmfzted> <label for="sku" data-astro-cid-tpmfzted>SKU *</label> <input type="text" id="sku" name="sku" required data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="title" data-astro-cid-tpmfzted>Título *</label> <input type="text" id="title" name="title" required data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="price" data-astro-cid-tpmfzted>Precio *</label> <input type="number" id="price" name="price" step="0.01" required data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="regularPrice" data-astro-cid-tpmfzted>Precio Regular *</label> <input type="number" id="regularPrice" name="regularPrice" step="0.01" required data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="imageUrl" data-astro-cid-tpmfzted>URL de Imagen *</label> <input type="url" id="imageUrl" name="imageUrl" required data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="tier" data-astro-cid-tpmfzted>Tier</label> <input type="number" id="tier" name="tier" value="0" data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="link" data-astro-cid-tpmfzted>Link</label> <input type="url" id="link" name="link" data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="disponible" data-astro-cid-tpmfzted>Stock Disponible *</label> <input type="number" id="disponible" name="disponible" required data-astro-cid-tpmfzted> </div> <div class="form-group" data-astro-cid-tpmfzted> <label for="tipo" data-astro-cid-tpmfzted>Tipo *</label> <select id="tipo" name="tipo" required data-astro-cid-tpmfzted> <option value="package" data-astro-cid-tpmfzted>Paquete</option> <option value="subscription" data-astro-cid-tpmfzted>Suscripción</option> </select> </div> <div class="form-group checkbox-group" data-astro-cid-tpmfzted> <label class="checkbox-label" data-astro-cid-tpmfzted> <input type="checkbox" id="featured" name="featured" data-astro-cid-tpmfzted>
Destacado
</label> </div> </div> <div class="form-group full-width" data-astro-cid-tpmfzted> <label for="notas" data-astro-cid-tpmfzted>Notas</label> <textarea id="notas" name="notas" rows="3" data-astro-cid-tpmfzted></textarea> </div> <div class="form-actions" data-astro-cid-tpmfzted> <a href="/admin/inventory" class="btn-secondary" data-astro-cid-tpmfzted>Cancelar</a> <button type="submit" class="btn-primary" data-astro-cid-tpmfzted>Guardar Producto</button> </div> </form> </div> ` })}  ${renderScript($$result, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory/new.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory/new.astro";
const $$url = "/admin/inventory/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$New,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

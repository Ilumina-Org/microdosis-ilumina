import { c as createAstro, a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../../../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_CmNwAmQL.mjs';
import { g as getStock } from '../../../../chunks/stock_CyV-sWuA.mjs';
/* empty css                                          */
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("http://localhost:4321");
const $$sku = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$sku;
  const { sku } = Astro2.params;
  const products = await getStock();
  const product = products[sku];
  if (!product) {
    return Astro2.redirect("/admin/inventory");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Editar Producto", "data-astro-cid-mnslylws": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-header" data-astro-cid-mnslylws> <h1 data-astro-cid-mnslylws>Editar Producto</h1> </div> <div class="form-container" data-astro-cid-mnslylws> <form id="productForm" class="product-form" data-astro-cid-mnslylws> <div class="form-grid" data-astro-cid-mnslylws> <div class="form-group" data-astro-cid-mnslylws> <label for="sku" data-astro-cid-mnslylws>SKU *</label> <input type="text" id="sku" name="sku"${addAttribute(product.sku, "value")} readonly data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="title" data-astro-cid-mnslylws>Título *</label> <input type="text" id="title" name="title"${addAttribute(product.title, "value")} required data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="price" data-astro-cid-mnslylws>Precio *</label> <input type="number" id="price" name="price" step="0.01"${addAttribute(product.price, "value")} required data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="regularPrice" data-astro-cid-mnslylws>Precio Regular *</label> <input type="number" id="regularPrice" name="regularPrice" step="0.01"${addAttribute(product.regularPrice, "value")} required data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="imageUrl" data-astro-cid-mnslylws>URL de Imagen *</label> <input type="url" id="imageUrl" name="imageUrl"${addAttribute(product.imageUrl, "value")} required data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="tier" data-astro-cid-mnslylws>Tier</label> <input type="number" id="tier" name="tier"${addAttribute(product.tier, "value")} data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="link" data-astro-cid-mnslylws>Link</label> <input type="url" id="link" name="link"${addAttribute(product.link, "value")} data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="disponible" data-astro-cid-mnslylws>Stock Disponible *</label> <input type="number" id="disponible" name="disponible"${addAttribute(product.disponible, "value")} required data-astro-cid-mnslylws> </div> <div class="form-group" data-astro-cid-mnslylws> <label for="tipo" data-astro-cid-mnslylws>Tipo *</label> <select id="tipo" name="tipo" required data-astro-cid-mnslylws> <option value="package"${addAttribute(product.tipo === "package", "selected")} data-astro-cid-mnslylws>Paquete</option> <option value="subscription"${addAttribute(product.tipo === "subscription", "selected")} data-astro-cid-mnslylws>Suscripción</option> </select> </div> <div class="form-group checkbox-group" data-astro-cid-mnslylws> <label class="checkbox-label" data-astro-cid-mnslylws> <input type="checkbox" id="featured" name="featured"${addAttribute(product.featured, "checked")} data-astro-cid-mnslylws>
Destacado
</label> </div> </div> <div class="form-group full-width" data-astro-cid-mnslylws> <label for="notas" data-astro-cid-mnslylws>Notas</label> <textarea id="notas" name="notas" rows="3" data-astro-cid-mnslylws>${product.notas}</textarea> </div> <div class="form-actions" data-astro-cid-mnslylws> <a href="/admin/inventory" class="btn-secondary" data-astro-cid-mnslylws>Cancelar</a> <button type="submit" class="btn-primary" data-astro-cid-mnslylws>Guardar Cambios</button> </div> </form> </div> ` })}  ${renderScript($$result, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory/edit/[sku].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory/edit/[sku].astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/admin/inventory/edit/[sku].astro";
const $$url = "/admin/inventory/edit/[sku]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$sku,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

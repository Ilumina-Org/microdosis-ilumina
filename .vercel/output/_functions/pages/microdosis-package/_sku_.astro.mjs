import { c as createAstro, a as createComponent, m as maybeRenderHead, b as renderTemplate, r as renderComponent } from '../../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../../chunks/Layout_D3zStpAR.mjs';
import { a as getProducts } from '../../chunks/stock_CyV-sWuA.mjs';
import 'clsx';
/* empty css                                    */
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useRef, useEffect } from 'react';
import { Wallet, initMercadoPago } from '@mercadopago/sdk-react';
import { N as NotFoundPage } from '../../chunks/NotFound_COhUD01L.mjs';
export { renderers } from '../../renderers.mjs';

const getPackageData = async (sku) => {
  try {
    console.log("sku", sku);
    const products = await getProducts();
    console.log("products", products);
    const product = products.find((p) => p.sku === sku);
    if (!product) {
      throw new Error("NOT_FOUND");
    }
    if (!product.stock) {
      throw new Error("OUT_OF_STOCK");
    }
    return {
      id: product.sku,
      title: product.title,
      price: parseFloat(product.productPrice.replace("$", "")),
      originalPrice: parseFloat(
        product.productDetail.replace("Precio Regular $", "")
      ),
      savings: product.productDeal.replace("(Ahorra ", "").replace(")", ""),
      description: "Incluye envío estándar gratuito...",
      // Puedes personalizar esto
      imageUrl: product.imageUrl,
      tier: product.tier,
      link: product.link,
      stock: product.stock
    };
  } catch (error) {
    console.error("Error fetching package data:", error);
    if (error instanceof Error) {
      if (error.message === "NOT_FOUND") {
        throw new Error("El paquete no existe.");
      }
      if (error.message === "OUT_OF_STOCK") {
        throw new Error("El paquete no tiene stock disponible.");
      }
    }
    throw new Error("Error inesperado al obtener los datos del paquete.");
  }
};

const $$Astro$3 = createAstro("http://localhost:4321");
const $$PackageHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$PackageHeader;
  const { title, price, originalPrice, savings } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="package-header" data-astro-cid-s4mtpcbi> <h1 data-astro-cid-s4mtpcbi>${title}</h1> <p class="price" data-astro-cid-s4mtpcbi>$${price.toFixed(2)}</p> ${originalPrice && renderTemplate`<div class="price-details" data-astro-cid-s4mtpcbi> <span class="original-price" data-astro-cid-s4mtpcbi>
Precio Regular $${originalPrice.toFixed(2)} </span> <span class="savings" data-astro-cid-s4mtpcbi>(Ahorra ${savings})</span> </div>`} </div> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/package-details/package-header.astro", void 0);

const $$Astro$2 = createAstro("http://localhost:4321");
const $$PackageDescription = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PackageDescription;
  const { description } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="description-box" data-astro-cid-epgp4pan> <h2 data-astro-cid-epgp4pan>Descripción del Paquete</h2> <div class="description" data-astro-cid-epgp4pan>${description}</div> </div> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/package-details/package-description.astro", void 0);

const MercadoPagoCheckoutPro = ({ product_data }) => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const initialized = useRef(false);
  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;
    const initializePayment = async () => {
      try {
        if (!initialized.current) {
          initMercadoPago("APP_USR-76bfa056-51e9-4858-a632-fca8fab5a7f5", {
            locale: "es-PE"
          });
          initialized.current = true;
        }
        const response = await fetch("/api/create-preference", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product_data),
          signal: controller.signal
        });
        const data = await response.json();
        if (!data.id) throw new Error("Error al crear preferencia");
        if (isMounted) {
          setPreferenceId(data.id);
        }
      } catch (err) {
        if (isMounted && !controller.signal.aborted) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    initializePayment();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [product_data]);
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Cargando pasarela de pago..." });
  if (error) return /* @__PURE__ */ jsxs("div", { children: [
    "Error: ",
    error
  ] });
  return /* @__PURE__ */ jsx("div", { className: "mercado-pago-container", children: preferenceId && /* @__PURE__ */ jsx(Wallet, { initialization: { preferenceId } }) });
};

const PaymentOptions = ({
  basePrice,
  title,
  packageId
}) => {
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [totalPrice, setTotalPrice] = useState(basePrice);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [error, setError] = useState("");
  const [activeOption, setActiveOption] = useState(
    "mercadopago-option"
  );
  const [mercadoPagoKey, setMercadoPagoKey] = useState(0);
  const mercadoPagoRef = useRef({ price: 0, district: "", instance: null });
  useEffect(() => {
    if (!selectedDistrict) setMercadoPagoKey((prev) => prev + 1);
  }, [selectedDistrict]);
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await fetch("/api/districts");
        const data = await response.json();
        setDistricts(data);
      } catch (err) {
        setError("Error cargando los distritos");
      }
    };
    fetchDistricts();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    const calculateShipping = async () => {
      if (!selectedDistrict) return;
      setLoadingShipping(true);
      try {
        const response = await fetch(
          `/api/calculate-shipping?district=${selectedDistrict}&packageId=${packageId}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data.success) {
          setShippingCost(data.shippingCost);
          const newTotal = basePrice + data.shippingCost;
          setTotalPrice(newTotal);
          if (newTotal !== mercadoPagoRef.current.price || selectedDistrict !== mercadoPagoRef.current.district) {
            mercadoPagoRef.current = {
              price: newTotal,
              district: selectedDistrict,
              instance: /* @__PURE__ */ jsx(
                MercadoPagoCheckoutPro,
                {
                  product_data: {
                    price: newTotal,
                    name: title,
                    quantity: 1,
                    district: selectedDistrict
                  }
                },
                `${newTotal}-${selectedDistrict}`
              )
            };
          }
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError("Error calculando el envío");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingShipping(false);
        }
      }
    };
    calculateShipping();
    return () => controller.abort();
  }, [selectedDistrict, packageId, basePrice, title]);
  const toggleAccordion = (optionId) => {
    setActiveOption((prev) => prev === optionId ? null : optionId);
  };
  return /* @__PURE__ */ jsxs("div", { className: "payment-section", children: [
    /* @__PURE__ */ jsx("h2", { children: "Método de Pago" }),
    /* @__PURE__ */ jsxs("div", { className: "shipping-selector", children: [
      /* @__PURE__ */ jsx("label", { children: "Distrito de entrega:" }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: selectedDistrict,
          onChange: (e) => setSelectedDistrict(e.target.value),
          disabled: loadingShipping,
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Seleccione su distrito" }),
            districts.map((district) => /* @__PURE__ */ jsx("option", { value: district.code, children: district.name }, district.code))
          ]
        }
      ),
      loadingShipping && /* @__PURE__ */ jsx("span", { className: "loading", children: "Calculando envío..." }),
      shippingCost > 0 && !loadingShipping && /* @__PURE__ */ jsxs("div", { className: "shipping-cost", children: [
        "Costo de envío: S/ ",
        shippingCost.toFixed(2)
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "payment-options", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `payment-option ${activeOption === "mercadopago-option" ? "active" : ""}`,
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "payment-option-header",
                onClick: () => toggleAccordion("mercadopago-option"),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "payment-icon", children: "🟡" }),
                  /* @__PURE__ */ jsx("span", { className: "payment-title", children: "Mercado Pago" }),
                  /* @__PURE__ */ jsx("div", { className: "payment-badge", children: "Recomendado" }),
                  /* @__PURE__ */ jsx("span", { className: "toggle-icon", children: "▼" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "payment-option-content", children: /* @__PURE__ */ jsxs("div", { className: "mercado-pago-details", children: [
              /* @__PURE__ */ jsx("p", { className: "payment-description", children: "Paga con tarjeta, efectivo o saldo de Mercado Pago" }),
              /* @__PURE__ */ jsxs("div", { className: "payment-methods-grid", children: [
                /* @__PURE__ */ jsx("span", { className: "method-icon", children: "💳" }),
                /* @__PURE__ */ jsx("span", { className: "method-icon", children: "📱" }),
                /* @__PURE__ */ jsx("span", { className: "method-icon", children: "💵" })
              ] }),
              selectedDistrict && mercadoPagoRef.current.instance,
              /* @__PURE__ */ jsxs("div", { className: "security-info", children: [
                /* @__PURE__ */ jsx("span", { className: "lock-icon", children: "🔒" }),
                /* @__PURE__ */ jsx("span", { children: "Transacción 100% segura" })
              ] })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `payment-option ${activeOption === "card-option" ? "active" : ""}`,
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "payment-option-header",
                onClick: () => toggleAccordion("card-option"),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "payment-icon", children: "💳" }),
                  /* @__PURE__ */ jsx("span", { className: "payment-title", children: "Tarjeta de Débito/Crédito" }),
                  /* @__PURE__ */ jsx("span", { className: "toggle-icon", children: "▼" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "payment-option-content", children: /* @__PURE__ */ jsx("p", { className: "coming-soon", children: "Próximamente: Estamos trabajando en la integración segura de tarjetas" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `payment-option ${activeOption === "culqi-option" ? "active" : ""}`,
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "payment-option-header",
                onClick: () => toggleAccordion("culqi-option"),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "payment-icon", children: "⚡" }),
                  /* @__PURE__ */ jsx("span", { className: "payment-title", children: "Culqi" }),
                  /* @__PURE__ */ jsx("span", { className: "toggle-icon", children: "▼" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "payment-option-content", children: /* @__PURE__ */ jsx("p", { className: "coming-soon", children: "Integración con Culqi en desarrollo" }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `payment-option ${activeOption === "transfer-option" ? "active" : ""}`,
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "payment-option-header",
                onClick: () => toggleAccordion("transfer-option"),
                children: [
                  /* @__PURE__ */ jsx("span", { className: "payment-icon", children: "🏦" }),
                  /* @__PURE__ */ jsx("span", { className: "payment-title", children: "Transferencia Bancaria" }),
                  /* @__PURE__ */ jsx("span", { className: "toggle-icon", children: "▼" })
                ]
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "payment-option-content", children: /* @__PURE__ */ jsxs("div", { className: "bank-transfer-details", children: [
              /* @__PURE__ */ jsxs("div", { className: "bank-info-item", children: [
                /* @__PURE__ */ jsx("span", { className: "info-label", children: "Banco:" }),
                /* @__PURE__ */ jsx("span", { className: "info-value", children: "Banco Nacional" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bank-info-item", children: [
                /* @__PURE__ */ jsx("span", { className: "info-label", children: "Titular:" }),
                /* @__PURE__ */ jsx("span", { className: "info-value", children: "Microdosis Ilumina S.A." })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bank-info-item", children: [
                /* @__PURE__ */ jsx("span", { className: "info-label", children: "CBU/CVU:" }),
                /* @__PURE__ */ jsx("span", { className: "info-value highlight", children: "0000000000000000000000" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "bank-info-item", children: [
                /* @__PURE__ */ jsx("span", { className: "info-label", children: "ALIAS:" }),
                /* @__PURE__ */ jsx("span", { className: "info-value highlight", children: "MICRODOSIS.ILUMINA" })
              ] }),
              /* @__PURE__ */ jsx("button", { className: "contact-button", children: "📩 Enviar Comprobante" })
            ] }) })
          ]
        }
      )
    ] })
  ] });
};

const $$GuaranteeBox = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="guarantee-box" data-astro-cid-snetm3fp> <div class="guarantee-icon" data-astro-cid-snetm3fp>🛡️</div> <div class="guarantee-content" data-astro-cid-snetm3fp> <h3 data-astro-cid-snetm3fp>Garantía de Satisfacción</h3> <p data-astro-cid-snetm3fp>
Si no estás satisfecho con tu compra, ofrecemos una garantía de
            devolución de 30 días.
</p> </div> </div> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/package-details/guarantee-box.astro", void 0);

const $$Astro$1 = createAstro("http://localhost:4321");
const $$OrderSummary = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$OrderSummary;
  const { title, price } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="order-summary" data-astro-cid-htm4yxvh> <h2 data-astro-cid-htm4yxvh>Resumen de Compra</h2> <div class="summary-item" data-astro-cid-htm4yxvh> <span data-astro-cid-htm4yxvh>Producto:</span> <span data-astro-cid-htm4yxvh>${title}</span> </div> <div class="summary-item" data-astro-cid-htm4yxvh> <span data-astro-cid-htm4yxvh>Precio:</span> <span data-astro-cid-htm4yxvh>$${price.toFixed(2)}</span> </div> <div class="summary-item" data-astro-cid-htm4yxvh> <span data-astro-cid-htm4yxvh>Envío:</span> <span data-astro-cid-htm4yxvh>Gratis</span> </div> <div class="summary-divider" data-astro-cid-htm4yxvh></div> <div class="summary-total" data-astro-cid-htm4yxvh> <span data-astro-cid-htm4yxvh>Total:</span> <span data-astro-cid-htm4yxvh>$${price.toFixed(2)}</span> </div> <div class="secure-payment" data-astro-cid-htm4yxvh> <span class="secure-icon" data-astro-cid-htm4yxvh>🔒</span> <span data-astro-cid-htm4yxvh>Pago 100% Seguro</span> </div> <div class="help-section" data-astro-cid-htm4yxvh> <h3 data-astro-cid-htm4yxvh>¿Necesitas ayuda?</h3> <p data-astro-cid-htm4yxvh>Contáctanos por WhatsApp al:</p> <a href="https://wa.me/TUNUMERO" class="whatsapp-button" data-astro-cid-htm4yxvh> <span class="whatsapp-icon" data-astro-cid-htm4yxvh>📱</span>
Enviar Mensaje
</a> </div> </div> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/package-details/order-summary.astro", void 0);

const $$Astro = createAstro("http://localhost:4321");
const $$sku = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$sku;
  const { sku } = Astro2.params;
  let packageData = null;
  try {
    packageData = await getPackageData(sku);
    console.log(packageData);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "El paquete no existe.") {
        console.warn(`Paquete con SKU ${sku} no encontrado.`);
        Astro2.response.status = 404;
      } else if (error.message === "El paquete no tiene stock disponible.") {
        console.warn(`Paquete con SKU ${sku} sin stock.`);
        Astro2.response.status = 404;
      } else {
        console.error("Error inesperado:", error);
        Astro2.response.status = 500;
      }
    }
  }
  return renderTemplate`${packageData ? renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-5k2vwpyo": true }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="package-container" data-astro-cid-5k2vwpyo><div class="package-detail" data-astro-cid-5k2vwpyo>${renderComponent($$result2, "PackageHeader", $$PackageHeader, { "title": packageData.title, "price": packageData.price, "originalPrice": packageData.originalPrice, "savings": packageData.savings, "data-astro-cid-5k2vwpyo": true })}${renderComponent($$result2, "PackageDescription", $$PackageDescription, { "description": packageData.description, "data-astro-cid-5k2vwpyo": true })}${renderComponent($$result2, "PaymentOptions", PaymentOptions, { "client:load": true, "basePrice": packageData.price, "title": packageData.title, "packageId": sku, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/package-details/payment-options", "client:component-export": "default", "data-astro-cid-5k2vwpyo": true })}${renderComponent($$result2, "GuaranteeBox", $$GuaranteeBox, { "data-astro-cid-5k2vwpyo": true })}</div>${renderComponent($$result2, "OrderSummary", $$OrderSummary, { "title": packageData.title, "price": packageData.price, "data-astro-cid-5k2vwpyo": true })}</div>` })}` : renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-5k2vwpyo": true }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "NotFound", NotFoundPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/ReactComponents/NotFound", "client:component-export": "default", "data-astro-cid-5k2vwpyo": true })}` })}`}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/microdosis-package/[sku].astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/microdosis-package/[sku].astro";
const $$url = "/microdosis-package/[sku]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$sku,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

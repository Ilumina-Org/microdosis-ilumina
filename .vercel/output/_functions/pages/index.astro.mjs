import { a as createComponent, m as maybeRenderHead, e as renderScript, b as renderTemplate, f as addAttribute, r as renderComponent } from '../chunks/astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_D3zStpAR.mjs';
import 'clsx';
/* empty css                                 */
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as getProducts } from '../chunks/stock_Dxk2z7az.mjs';
export { renderers } from '../renderers.mjs';

const $$Chatbot = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="chat-wrapper" data-astro-cid-rniuooyg> <div class="chat-container" style="display: none;" data-astro-cid-rniuooyg> <div class="chat-box" data-astro-cid-rniuooyg> <button id="close-chat" class="close-button" data-astro-cid-rniuooyg>×</button> <div class="chat-message bot" data-astro-cid-rniuooyg> <p id="question-text" data-astro-cid-rniuooyg></p> </div> <div id="options-container" class="options" data-astro-cid-rniuooyg></div> <div id="thinking" class="thinking" data-astro-cid-rniuooyg> <div class="loading-spinner" data-astro-cid-rniuooyg></div> <p data-astro-cid-rniuooyg>Analizando tus respuestas...</p> </div> <div id="result-container" class="result-container" data-astro-cid-rniuooyg> <p id="result" class="result" data-astro-cid-rniuooyg></p> <button id="restart-chat" class="restart-button" data-astro-cid-rniuooyg>Realizar otra consulta</button> </div> </div> </div> </div>  ${renderScript($$result, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/Chatbot.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/Chatbot.astro", void 0);

const staticModel = new Proxy({"src":"/_astro/model_static.UUTIMT3p.png","width":960,"height":960,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/assets/model_static.png";
							}
							
							return target[name];
						}
					});

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="about" class="container"${addAttribute({ display: "flex", flexDirection: "column" }, "style")} data-astro-cid-v2cbyr3p> <div${addAttribute({
    display: "flex",
    flexDirection: "row",
    height: "50%",
    justifyContent: "center",
    gap: "30px"
  }, "style")} data-astro-cid-v2cbyr3p> <div${addAttribute({ width: "30%" }, "style")} data-astro-cid-v2cbyr3p> <h2 data-astro-cid-v2cbyr3p>Che cos'è la Microdose di Ayahuasca?</h2> <p data-astro-cid-v2cbyr3p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio
        quis elit sagittis luctus eget ac metus. Fusce finibus nec risus vitae
        facilisis. Morbi sit amet tempor arcu. Nullam eget velit venenatis,
        tincidunt sapien ac, commodo odio. Aenean sapien mauris, lobortis at
        nisl quis, gravida accumsan dui. Vivamus rhoncus ornare urna, ut mollis
        metus facilisis ut. Cras lacinia eros metus, ac sollicitudin ligula
        maximus hendrerit. Phasellus suscipit nunc mi
</p> </div> <img${addAttribute(staticModel.src, "src")} alt="" fetchpriority="high" width="300" height="300"${addAttribute({ height: "80%", objectFit: "cover" }, "style")} data-astro-cid-v2cbyr3p> </div> <div${addAttribute({
    display: "flex",
    flexDirection: "row",
    height: "50%",
    justifyContent: "center",
    gap: "30px"
  }, "style")} data-astro-cid-v2cbyr3p> <img${addAttribute(staticModel.src, "src")} alt="" fetchpriority="high" width="300" height="300"${addAttribute({ height: "80%", objectFit: "cover" }, "style")} data-astro-cid-v2cbyr3p> <div${addAttribute({ width: "30%" }, "style")} data-astro-cid-v2cbyr3p> <h2 data-astro-cid-v2cbyr3p>Che cos'è la Microdose di Ayahuasca?</h2> <ul data-astro-cid-v2cbyr3p> <li data-astro-cid-v2cbyr3p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
          odio quis elit sagittis
</li> <li data-astro-cid-v2cbyr3p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
          odio quis elit sagittis
</li> <li data-astro-cid-v2cbyr3p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
          odio quis elit sagittis
</li> <li data-astro-cid-v2cbyr3p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non
          odio quis elit sagittis
</li> </ul> </div> </div> </section> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/About.astro", void 0);

function Review({ imageUrl }) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        background: "white",
        display: "flex",
        flexDirection: "row",
        width: "550px",
        padding: "1rem",
        paddingRight: "1.5rem",
        borderRadius: "15px",
        boxShadow: "0px 5px 20px rgb(0, 0, 0, 0.25)",
        alignContent: "center",
        alignItems: "center",
        gap: "15px"
      },
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: imageUrl,
            alt: "",
            fetchPriority: "high",
            width: "125",
            height: "125",
            style: { border: "1px solid red" }
          }
        ),
        /* @__PURE__ */ jsxs("div", { style: { flexDirection: "column" }, children: [
          /* @__PURE__ */ jsx("p", { style: { marginTop: 0 }, children: /* @__PURE__ */ jsx("i", { style: { marginTop: 0, lineBreak: 4 }, children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean non odio quis elit sagittis luctus eget ac metus. Fusce finibus nec risus vitae facilisis. Morbi sit amet tempor arcu. Nullam eget velit venenatis, tincidunt sapien ac," }) }),
          /* @__PURE__ */ jsx("p", { style: { textAlign: "right", marginBottom: 0 }, children: "Carla Maurice R." })
        ] })
      ]
    }
  );
}

const $$Testimonials = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="testimonios" class="container"${addAttribute({ display: "flex", flexDirection: "column" }, "style")} data-astro-cid-aadlzisc> <div${addAttribute({
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  }, "style")} data-astro-cid-aadlzisc> <div${addAttribute({
    backgroundColor: "white",
    width: "700px",
    height: "400px",
    borderRadius: "20px",
    boxShadow: "0px 10px 10px rgb(0, 0, 0, 0.25)"
  }, "style")} data-astro-cid-aadlzisc></div> </div> <div${addAttribute({ width: "100%", borderColor: "white", textAlign: "center" }, "style")} data-astro-cid-aadlzisc> <h2${addAttribute({ fontWeight: 300, fontSize: "35px", color: "#C1DC3A" }, "style")} data-astro-cid-aadlzisc>
Opiniones de nuestros clientes
</h2> </div> <div${addAttribute({
    display: "flex",
    justifyContent: "center",
    alignContent: "center"
  }, "style")} data-astro-cid-aadlzisc> ${renderComponent($$result, "Review", Review, { "client:load": true, "imageUrl": staticModel.src, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/ReactComponents/Review", "client:component-export": "default", "data-astro-cid-aadlzisc": true })} </div> </section> `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/Testimonials.astro", void 0);

function ProductContainer({
  sku,
  link,
  imageUrl,
  productTitle,
  productDetail,
  productPrice,
  productDeal,
  tier,
  purchaseType,
  initialStock = true
}) {
  const [stockInfo, setStockInfo] = useState({
    canPurchase: initialStock,
    loading: true
  });
  const tierHandler = (tier2) => {
    switch (tier2) {
      case 0:
        return "radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%), radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%)";
      case 1:
        return "linear-gradient(-40deg,#dedede,#ffffff 16%,#dedede 21%,#ffffff 24%,#454545 27%,#dedede 36%,#ffffff 45%,#ffffff 60%,#dedede 72%,#ffffff 80%,#dedede 84%,#a1a1a1)";
      case 2:
        return "linear-gradient(-72deg, #ca7345, #ffdeca 16%, #ca7345 21%, #ffdeca 24%, #a14521 27%, #ca7345 36%, #ffdeca 45%, #ffdeca 60%, #ca7345 72%, #ffdeca 80%, #ca7345 84%, #732100)";
      default:
        return "";
    }
  };
  const buttonStyle = {
    width: "fit-content",
    padding: "1rem",
    paddingTop: ".75rem",
    paddingBottom: ".75rem",
    background: "#C1DC3A",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer"
  };
  useEffect(() => {
    const checkRealTimeStock = async () => {
      try {
        const response = await fetch(`/api/check-stock?productId=${sku}`);
        const data = await response.json();
        setStockInfo({
          canPurchase: data.canPurchase,
          loading: false
        });
      } catch (error) {
        console.error("Error checking stock:", error);
        setStockInfo((prev) => ({ ...prev, loading: false }));
      }
    };
    checkRealTimeStock();
  }, [sku]);
  const handleClick = () => {
    if (!stockInfo.loading && stockInfo.canPurchase) {
      window.location.href = link;
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      style: {
        background: tierHandler(tier),
        padding: ".5rem",
        borderRadius: "30px",
        boxShadow: "0px 15px 40px rgb(0, 0, 0, 0.2)"
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            backgroundColor: "white",
            width: "16rem",
            height: "27rem",
            maxHeight: "27rem",
            display: "flex",
            padding: ".75rem",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "20px"
          },
          children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: imageUrl,
                alt: productTitle,
                fetchPriority: "high",
                width: "100%",
                height: "55%",
                style: { objectFit: "contain" }
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "15px" }, children: [
              /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "7px" }, children: [
                /* @__PURE__ */ jsx("h3", { style: { fontSize: "23px", margin: 0 }, children: productTitle }),
                /* @__PURE__ */ jsx("p", { style: { fontSize: "15px", margin: 0 }, children: productDetail }),
                /* @__PURE__ */ jsx("p", { style: { fontSize: "30px", margin: 0 }, children: productPrice }),
                /* @__PURE__ */ jsx("p", { style: { fontSize: "15px", margin: 0 }, children: productDeal })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  style: {
                    ...buttonStyle,
                    opacity: stockInfo.loading ? 0.7 : 1,
                    cursor: !stockInfo.canPurchase ? "not-allowed" : "pointer",
                    backgroundColor: !stockInfo.canPurchase ? "#ccc" : buttonStyle.background
                  },
                  onClick: handleClick,
                  disabled: stockInfo.loading || !stockInfo.canPurchase,
                  children: stockInfo.loading ? "Verificando..." : purchaseType === "subscription" ? "Suscripción mensual" : stockInfo.canPurchase ? "Comprar ahora" : "AGOTADO"
                }
              )
            ] })
          ]
        }
      )
    }
  );
}

const $$Products = createComponent(async ($$result, $$props, $$slots) => {
  const products = await getProducts();
  console.log("products", products);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-qnwxz4mj": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section id="products" class="container"${addAttribute({
    display: "flex",
    flexDirection: "column",
    height: "70%",
    justifyContent: "center"
  }, "style")} data-astro-cid-qnwxz4mj> <!-- Sección de Título --> <div${addAttribute({ width: "100%", textAlign: "left" }, "style")} data-astro-cid-qnwxz4mj> <h2${addAttribute({ fontWeight: 300, fontSize: "35px", color: "black" }, "style")} data-astro-cid-qnwxz4mj>
Paquetes Disponibles
</h2> </div> <div${addAttribute({
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  }, "style")} data-astro-cid-qnwxz4mj> ${products.map((product) => renderTemplate`${renderComponent($$result2, "ProductContainer", ProductContainer, { "client:load": true, "key": product.sku, "sku": product.sku, "link": product.link, "imageUrl": product.imageUrl, "productTitle": product.title, "productDetail": product.productDetail, "productPrice": product.productPrice, "productDeal": product.productDeal, "tier": product.tier, "purchaseType": product.sku.includes("subscription") ? "subscription" : void 0, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/ReactComponents/ProductContainer", "client:component-export": "default", "data-astro-cid-qnwxz4mj": true })}`)} </div> <!-- <ReviewComponent /> --> </section> ` })} `;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/Products.astro", void 0);

function Button({ id, label, onClick = () => alert("click") }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "input",
    {
      id,
      type: "button",
      value: label,
      onClick,
      style: {
        width: "fit-content",
        padding: "1.5rem",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        background: "#C1DC3A",
        borderRadius: "10px",
        border: "none",
        fontSize: "30px",
        fontFamily: "Inter",
        fontWeight: "200",
        cursor: "pointer"
      }
    }
  ) });
}

const SectionLayout = ({ id, children }) => {
  const containerStyle = {
    // overflow: "hidden",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    background: `
      radial-gradient(
        41.74% 98.84% at 61.04% 47.01%,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0.2) 100%
      ),
      linear-gradient(
        68.99deg,
        #003325 10.95%,
        #013726 60.57%,
        #013520 103.7%
      ),
      #013726`
  };
  return /* @__PURE__ */ jsx("section", { id, style: { ...containerStyle, flexDirection: "row" }, children });
};

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Landing = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "SectionLayout", SectionLayout, { "id": "inicio", "data-astro-cid-sefmxpgk": true }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([" ", "<div", " data-astro-cid-sefmxpgk> <p", ' data-astro-cid-sefmxpgk>ILUMINA</p> </div> <div class="content" data-astro-cid-sefmxpgk> <h1 data-astro-cid-sefmxpgk>\nDescubre el poder <br data-astro-cid-sefmxpgk> sanador de la <br data-astro-cid-sefmxpgk> <span class="highlight" data-astro-cid-sefmxpgk>Ayahuasca <br data-astro-cid-sefmxpgk> en Microdosis.</span> </h1> <h3 data-astro-cid-sefmxpgk>100% ingredientes naturales</h3> ', ' </div> <div class="image-container" data-astro-cid-sefmxpgk> <!--disabled for testing --> <!-- <canvas id="model-image"></canvas> --> <!-- <script src="../../public/animation.js" type="module"><\/script> --> </div>  '])), maybeRenderHead(), addAttribute({ height: "auto", position: "absolute", left: "4rem", top: "2rem" }, "style"), addAttribute({ color: "white", fontSize: "50px" }, "style"), renderComponent($$result2, "Button", Button, { "id": "toggle-chat", "label": "Simula tu dosificaci\xF3n", "data-astro-cid-sefmxpgk": true })) })}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/Landing.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Landing", $$Landing, { "id": "inicio" })} ${renderComponent($$result2, "About", $$About, { "id": "about" })} ${renderComponent($$result2, "Testimonials", $$Testimonials, { "id": "testimonios" })} ${renderComponent($$result2, "Products", $$Products, { "id": "products" })} ${renderComponent($$result2, "Testimonials", $$Testimonials, { "id": "testimonios" })}  ${renderComponent($$result2, "Chatbot", $$Chatbot, {})} ` })}`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/index.astro", void 0);

const $$file = "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

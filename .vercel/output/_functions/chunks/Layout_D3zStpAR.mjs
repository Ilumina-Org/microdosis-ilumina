import { c as createAstro, a as createComponent, f as addAttribute, g as renderHead, r as renderComponent, d as renderSlot, b as renderTemplate } from './astro/server_CQ3Hs6UC.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
/* empty css                         */

const NavigationButtons = () => {
  const [active, setActive] = useState();
  const handleClick = (e, target) => {
    let value = e.target.getAttribute("href");
    if (`${value}`.includes(target)) {
      setActive(`${target}`);
    } else {
      setActive(null);
    }
  };
  const aStyling = {
    textDecoration: "none",
    color: "white"
  };
  const handleSelect = (value) => {
    if (active === value) {
      return "-.5px -.5px 0 #ffffff, .5px -.5px 0 #ffffff, -.5px .5px 0 #ffffff, .5px .5px 0 #ffffff";
    } else {
      return void 0;
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        position: "fixed",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        color: "white",
        gap: "20px",
        right: "4rem",
        top: "5rem",
        fontSize: "30px",
        fontFamily: "Inter",
        fontWeight: "200",
        textAlign: "right"
      },
      children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#inicio",
            onClick: (e) => handleClick(e, "inicio"),
            style: {
              ...aStyling,
              textShadow: handleSelect("inicio"),
              opacity: active == "inicio" ? 1 : 0.5
            },
            children: "Inicio"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#about",
            onClick: (e) => handleClick(e, "about"),
            style: {
              ...aStyling,
              textShadow: handleSelect("about"),
              opacity: active == "about" ? 1 : 0.5
            },
            children: "¿Qué es?"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#testimonios",
            onClick: (e) => handleClick(e, "testimonios"),
            style: {
              ...aStyling,
              textShadow: handleSelect("testimonios"),
              opacity: active == "testimonios" ? 1 : 0.5
            },
            children: "Testimonios"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "#products",
            onClick: (e) => handleClick(e, "products"),
            style: {
              ...aStyling,
              textShadow: handleSelect("products"),
              opacity: active == "products" ? 1 : 0.5
            },
            children: "Productos"
          }
        ),
        /* @__PURE__ */ jsxs(
          "a",
          {
            href: "#faqs",
            onClick: (e) => handleClick(e, "faqs"),
            style: {
              ...aStyling,
              textShadow: handleSelect("faqs"),
              opacity: active == "faqs" ? 1 : 0.5
            },
            children: [
              "Preguntas ",
              /* @__PURE__ */ jsx("br", {}),
              " frecuentes"
            ]
          }
        )
      ]
    }
  );
};

const $$Astro = createAstro("http://localhost:4321");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title = "Ilumina - Microdosis" } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"><title>Astro Basics</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderComponent($$result, "NavigationButtons", NavigationButtons, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/components/ReactComponents/NavigationButtons", "client:component-export": "default", "data-astro-cid-sckkx6r4": true })} <input type="button"${addAttribute("Comprar ahora", "value")}${addAttribute({
    position: "fixed",
    width: "fit-content",
    padding: "1.5rem",
    paddingTop: "1rem",
    paddingBottom: "1rem",
    background: "#C1DC3A",
    borderRadius: "10px",
    border: "none",
    bottom: "2rem",
    right: "2rem",
    fontSize: "30px",
    fontFamily: "Inter",
    fontWeight: "200"
  }, "style")} data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/lucas/code/work/ayahuasca/microdosis-ilumina/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };

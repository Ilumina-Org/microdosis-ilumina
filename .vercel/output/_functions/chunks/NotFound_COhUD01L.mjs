import { jsxs, jsx } from 'react/jsx-runtime';
import 'react';
import { s as styles } from './_sku_.b1d2ea96_Di6odpwI.mjs';

const NotFoundPage = () => {
  return /* @__PURE__ */ jsxs("div", { className: styles.notFoundContainer, children: [
    /* @__PURE__ */ jsx("h1", { className: styles.title, children: "😢 Paquete no encontrado" }),
    /* @__PURE__ */ jsx("p", { className: styles.description, children: "El paquete que estás buscando no existe o ha sido eliminado" }),
    /* @__PURE__ */ jsx("a", { href: "/pricing", className: styles.homeLink, children: "Volver al catálogo" })
  ] });
};

export { NotFoundPage as N };

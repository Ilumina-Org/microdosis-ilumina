import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_CGMvrhnV.mjs';
import { manifest } from './manifest_CeaoKi9X.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/admin/inventory/edit/_sku_.astro.mjs');
const _page3 = () => import('./pages/admin/inventory/new.astro.mjs');
const _page4 = () => import('./pages/admin/inventory.astro.mjs');
const _page5 = () => import('./pages/admin/inventory.astro2.mjs');
const _page6 = () => import('./pages/admin/orders/_orderid_.astro.mjs');
const _page7 = () => import('./pages/admin/orders.astro.mjs');
const _page8 = () => import('./pages/api/calculate-shipping.astro.mjs');
const _page9 = () => import('./pages/api/check-stock.astro.mjs');
const _page10 = () => import('./pages/api/create-preference.astro.mjs');
const _page11 = () => import('./pages/api/districts.astro.mjs');
const _page12 = () => import('./pages/api/inventory/_sku_.astro.mjs');
const _page13 = () => import('./pages/api/inventory.astro.mjs');
const _page14 = () => import('./pages/api/orders/_orderid_.astro.mjs');
const _page15 = () => import('./pages/api/orders.astro.mjs');
const _page16 = () => import('./pages/api/save-address.astro.mjs');
const _page17 = () => import('./pages/api/save-payment.astro.mjs');
const _page18 = () => import('./pages/failure.astro.mjs');
const _page19 = () => import('./pages/microdosis-package/_sku_.astro.mjs');
const _page20 = () => import('./pages/pending.astro.mjs');
const _page21 = () => import('./pages/success.astro.mjs');
const _page22 = () => import('./pages/suscription.astro.mjs');
const _page23 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/admin/inventory/edit/[sku].astro", _page2],
    ["src/pages/admin/inventory/new.astro", _page3],
    ["src/pages/admin/inventory/index.astro", _page4],
    ["src/pages/admin/inventory.astro", _page5],
    ["src/pages/admin/orders/[orderId].astro", _page6],
    ["src/pages/admin/orders.astro", _page7],
    ["src/pages/api/calculate-shipping.ts", _page8],
    ["src/pages/api/check-stock.ts", _page9],
    ["src/pages/api/create-preference.ts", _page10],
    ["src/pages/api/districts.ts", _page11],
    ["src/pages/api/inventory/[sku].ts", _page12],
    ["src/pages/api/inventory/index.ts", _page13],
    ["src/pages/api/orders/[orderId].ts", _page14],
    ["src/pages/api/orders/index.ts", _page15],
    ["src/pages/api/save-address.ts", _page16],
    ["src/pages/api/save-payment.ts", _page17],
    ["src/pages/failure.astro", _page18],
    ["src/pages/microdosis-package/[sku].astro", _page19],
    ["src/pages/pending.astro", _page20],
    ["src/pages/success.astro", _page21],
    ["src/pages/suscription.astro", _page22],
    ["src/pages/index.astro", _page23]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "8ba33c68-4aa2-4473-8fbf-37435a4afdd2",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

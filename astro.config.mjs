// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "http://localhost:4321",
  server: {
    headers:
      process.env.NODE_ENV === "production"
        ? {
          "Content-Security-Policy": `
        default-src 'self';
        script-src 'self' https://sdk.mercadopago.com https://http2.mlstatic.com https://www.mercadopago.com https://storage.googleapis.com;
        style-src 'self' 'unsafe-inline';
        img-src 'self' data: https:;
        connect-src 'self' https://api.mercadopago.com https://api.mercadolibre.com https://events.mercadopago.com;
        frame-src 'self' https://www.mercadopago.com https://www.mercadolibre.com;
        font-src 'self' https://http2.mlstatic.com;
      `
            .replace(/\s{2,}/g, " ")
            .trim(),
        }
        : {},
  },
  output: "server",
  adapter: vercel(),
  integrations: [react()],
  devToolbar: { enabled: false },
});

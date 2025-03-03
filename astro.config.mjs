// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    mode: 'directory',
    runtime: {
      type: 'pages',
      bindings: {
        PAYMENTS_KV: { type: 'kv', id: '75b3196d7e6d4bef93a5354e961e890d' },
        STOCK_KV: { type: 'kv', id: '7ce3af83eb374f109ffb1a78a9035164' }
      }
    }
  }),
  integrations: [
    react({
      include: ['**/react/*', '**/ReactComponents/*', '**/package-details/*', '**/payments/*', '**/pricing/*'],
      ssr: false
    })
  ],
  vite: {
    build: {
      rollupOptions: {
        external: [
          'nodemailer',
          'googleapis',
          'google-auth-library',
          'stream',
          'fs',
          'events',
          'child_process',
          'os',
          'querystring',
          'url',
          'http2',
          'assert',
          'buffer',
          'tls',
          'net',
          'http',
          'https',
          'zlib',
          'crypto'
        ]
      }
    },
    ssr: {
      noExternal: ['react-responsive-carousel']
    },
    plugins: [
      {
        name: 'inject-polyfills',
        enforce: 'pre',
        transform(code, id) {
          if (id.includes('_@astro-renderers')) {
            return {
              code: `import '/src/polyfills.js';\n${code}`,
              map: null
            };
          }
        }
      }
    ]
  }
});

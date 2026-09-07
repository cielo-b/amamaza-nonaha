import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { Plugin } from "vite";
import { BadRequestError, fetchTikTokOembed } from "./src/server/tiktokOembed";

/**
 * Serves /api/tiktok-oembed during `npm run dev`, mirroring the Netlify
 * function that handles the same path in production. Without it the campaign
 * grid could only ever be tested against a deployed build.
 */
const tiktokOembedDevApi = (): Plugin => ({
  name: "tiktok-oembed-dev-api",
  configureServer(server) {
    server.middlewares.use("/api/tiktok-oembed", async (req, res) => {
      const url = new URL(req.url ?? "", "http://localhost").searchParams.get("url");
      const send = (body: unknown, status: number) => {
        res.statusCode = status;
        res.setHeader("content-type", "application/json");
        res.end(JSON.stringify(body));
      };
      if (!url) return send({ error: "missing url parameter" }, 400);
      try {
        send(await fetchTikTokOembed(url), 200);
      } catch (error) {
        send(
          { error: error instanceof Error ? error.message : "lookup failed" },
          error instanceof BadRequestError ? 400 : 502,
        );
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), tiktokOembedDevApi(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-ui': ['lucide-react', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'vendor-utils': ['i18next', 'react-i18next', 'zod'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
}));

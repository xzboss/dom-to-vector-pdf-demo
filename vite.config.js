import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import { PORT } from "./config";

// https://vite.dev/config/
const root = process.cwd();

export default defineConfig({
  root,
  plugins: [vue()],
  server: {
    port: PORT,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

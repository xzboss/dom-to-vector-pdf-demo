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
    port: PORT, // 设置你想要的端口号
    strictPort: true, // 如果端口被占用则退出，而不是尝试下一个可用端口
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

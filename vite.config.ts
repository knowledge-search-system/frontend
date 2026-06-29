import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const gatewayUrl = process.env.VITE_GATEWAY_PROXY_TARGET ?? "http://localhost:8082";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: gatewayUrl,
        changeOrigin: true,
      },
    },
  },
});

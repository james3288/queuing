import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy API calls to Django
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
      // Proxy WebSocket connections to Django Channels
      "/ws": {
        target: "ws://localhost:8000",
        ws: true,
      },
    },
  },
});

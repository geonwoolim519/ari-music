import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/ari-music/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
});

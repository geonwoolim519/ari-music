import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const githubPages = Boolean(
  (globalThis as { process?: { env?: { GITHUB_ACTIONS?: string } } }).process
    ?.env?.GITHUB_ACTIONS,
);

export default defineConfig({
  base: githubPages ? "/ari-music/" : "/",
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
});

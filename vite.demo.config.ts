import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "demo",
    assetsDir: "react-headless-markdown-editor/assets",
  },
});

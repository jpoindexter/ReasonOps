import { defineConfig } from "vitest/config"; // ✅ use vitest-aware config
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@frontend": path.resolve(__dirname, "frontend"),
      "@backend": path.resolve(__dirname, "backend"),
      "@components": path.resolve(__dirname, "frontend/components"),
      "@lib": path.resolve(__dirname, "frontend/lib"),
      "@hooks": path.resolve(__dirname, "frontend/hooks"),
      "@schemas": path.resolve(__dirname, "frontend/schemas"),
      "@types": path.resolve(__dirname, "frontend/types"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    include: ["tests/**/*.test.{ts,tsx}"],
  },
});

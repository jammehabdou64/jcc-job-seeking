import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.ts"],
      refresh: true,
      ssr: "resources/js/ssr.ts",
    }),
    vue(),
    tailwind(),
  ],
});

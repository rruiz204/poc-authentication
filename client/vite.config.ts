import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@Routes", replacement: "/src/Core/Routes" },
      { find: "@Stores", replacement: "/src/Core/Stores" },
      { find: "@Modules", replacement: "/src/Modules" },
    ],
  },
})

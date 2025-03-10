import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: "@Routes", replacement: "/src/Core/Routes" },
      { find: "@Modules", replacement: "/src/Modules" },
    ],
  },
})

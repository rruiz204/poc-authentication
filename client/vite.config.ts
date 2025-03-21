import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@Common", replacement: "/src/Components/Common" },
      { find: "@Services", replacement: "/src/Core/Services" },
      { find: "@Helpers", replacement: "/src/Core/Helpers" },
      { find: "@Schemas", replacement: "/src/Core/Schemas" },
      { find: "@Routes", replacement: "/src/Core/Routes" },
      { find: "@Stores", replacement: "/src/Core/Stores" },
      { find: "@Hooks", replacement: "/src/Core/Hooks" },
      { find: "@Modules", replacement: "/src/Modules" },
    ],
  },
})

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["styled-components", { displayName: true }]],
      },
    }),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
  ],
})

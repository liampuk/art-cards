import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig({
  server: {
    https: {
      key: "./key.pem",
      cert: "./cert.pem",
    },
    host: "0.0.0.0", // To make it accessible on your local network
    port: 5000, // Optional: specify a port
  },
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

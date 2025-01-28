import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import svgr from "vite-plugin-svgr"

export default defineConfig(({ mode }) => {
  // @ts-ignore I don't want to install node types
  const env = loadEnv(mode, process.cwd(), "")

  return {
    ...(env.VITE_ENABLE_SSL === "true" && {
      server: {
        https: {
          key: "./key.pem",
          cert: "./cert.pem",
        },
        host: "0.0.0.0",
        port: 3000,
      },
    }),
    plugins: [
      react({
        babel: {
          plugins:
            mode === "development"
              ? [["styled-components", { displayName: true }]]
              : [],
        },
      }),
      svgr({
        svgrOptions: {
          ref: true,
        },
      }),
    ],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})

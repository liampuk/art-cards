/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_SSL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

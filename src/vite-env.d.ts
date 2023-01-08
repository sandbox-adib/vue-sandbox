/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SERVICE_ENDPOINT: string
// more env variables...
}

export interface ImportMeta {
    readonly env: ImportMetaEnv
}
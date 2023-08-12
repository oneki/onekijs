/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_GOOGLE_TOKEN_ENDPOINT: string;
  readonly VITE_GOOGLE_USERINFO_ENDPOINT: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
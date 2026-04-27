/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute or origin-relative API root, e.g. `https://api.example.com` or `/api` (no trailing slash). */
  readonly VITE_API_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

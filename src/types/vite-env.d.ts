interface ImportMetaEnv {
  readonly VITE_APP_ORIGIN: string;
  readonly VITE_APP_ADMIN_EMAIL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

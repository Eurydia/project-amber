declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly DATABASE_URL: string;
      readonly REDIS_URL: string;
    }
  }
}

export {};

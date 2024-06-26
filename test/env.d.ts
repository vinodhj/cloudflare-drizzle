declare module 'cloudflare:test' {
  // ...or if you have an existing `Env` type...
  interface ProvidedEnv extends Env {
    TURSO_URL: string;
    TURSO_AUTH_TOKEN: string;
    // TEST_MIGRATIONS: D1Migration[];
  }
}

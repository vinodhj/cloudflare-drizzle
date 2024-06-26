import { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();
export default {
  schema: 'db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
} satisfies Config;

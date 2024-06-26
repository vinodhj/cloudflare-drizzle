import { Config } from 'drizzle-kit';
import dotenv from 'dotenv';
dotenv.config();
export default {
	schema: 'db/schema.ts',
	out: './migrations',
	dialect: 'sqlite',
	driver: 'turso',
	dbCredentials: {
		url: process.env.DB_URL!,
		authToken: process.env.DB_TOKEN!,
	},
} satisfies Config;

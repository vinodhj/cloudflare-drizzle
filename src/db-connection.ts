import { createClient } from '@libsql/client';
import * as schema from '../db/schema';
import { drizzle } from 'drizzle-orm/libsql';

export function dbConnection(url: string, authToken: string) {
	const client = createClient({
		url,
		authToken,
	});

	return drizzle(client, { schema });
}

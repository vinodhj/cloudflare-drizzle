import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { users } from '../db/schema';
import { dbConnection } from './db-connection';
import { customAlphabet, nanoid } from 'nanoid';
import { handleDizzleInsert } from './handle-dizzle-insert';

export interface Env {
  TURSO_URL: string;
  TURSO_AUTH_TOKEN: string;
}

export const addCorsHeaders = (response: Response) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/dizzle-insert' && request.method === 'GET') {
      const db = dbConnection(env.TURSO_URL, env.TURSO_AUTH_TOKEN);
      return await handleDizzleInsert(db);
    }

    // Return 404
    return addCorsHeaders(new Response('Not found', { status: 404 }));
  },
} satisfies ExportedHandler<Env>;

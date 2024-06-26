import { dbConnection } from './db-connection';
import { handleDizzleRead } from './handle-dizzle-read';
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
    const db = dbConnection(env.TURSO_URL, env.TURSO_AUTH_TOKEN);
    if (path === '/dizzle-insert' && request.method === 'GET') {
      return await handleDizzleInsert(db);
    }

    if (path === '/dizzle-read' && request.method === 'GET') {
      return await handleDizzleRead(db);
    }

    // Return 404
    return addCorsHeaders(new Response('Not found', { status: 404 }));
  },
} satisfies ExportedHandler<Env>;

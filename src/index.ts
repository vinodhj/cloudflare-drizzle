import { users } from '../db/schema';
import { dbConnection } from './db-connection';
import { customAlphabet, nanoid } from 'nanoid';

export interface Env {
  TURSO_URL: string;
  TURSO_AUTH_TOKEN: string;
}

const addCorsHeaders = (response: Response) => {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
};

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/dizzle-test' && request.method === 'GET') {
      const db = dbConnection(env.TURSO_URL, env.TURSO_AUTH_TOKEN);
      const nano_int_id = customAlphabet('1234567890', 6);

      const insert_values = {
        id: Number(nano_int_id()),
        fullName: nanoid() as string,
        phone: nano_int_id(10) as string,
      };
      const response = await db.insert(users).values(insert_values).returning().get();
      const result = new Response(JSON.stringify({ msg: 'Inserted successfully', response }), { status: 200 });
      return addCorsHeaders(result);
    }

    // Return 404
    return addCorsHeaders(new Response('Not found', { status: 404 }));
  },
} satisfies ExportedHandler<Env>;

import { users } from '../schema';
import { dbConnection } from './db-connection';
import { customAlphabet, nanoid } from 'nanoid';

export interface Env {
  DB_URL: string;
  DB_TOKEN: string;
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const db = dbConnection(env.DB_URL, env.DB_TOKEN);
    const nano_int_id = customAlphabet('1234567890', 6);

    const insert_values = {
      id: Number(nano_int_id()),
      fullName: nanoid() as string,
      phone: nano_int_id(10) as string,
    };
    const response = await db.insert(users).values(insert_values).returning().get();
    console.log(`Inserted successfully:`, JSON.stringify(response));
    return new Response('Hello World!');
  },
} satisfies ExportedHandler<Env>;

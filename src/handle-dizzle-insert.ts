import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { users } from '../db/schema';
import { addCorsHeaders } from '.';
import { customAlphabet, nanoid } from 'nanoid';
import * as dbSchema from '../db/schema';

export const handleDizzleInsert = async (db: LibSQLDatabase<typeof dbSchema>): Promise<Response> => {
  const nano_int_id = customAlphabet('1234567890', 6);

  const insert_values = {
    id: Number(nano_int_id()),
    fullName: nanoid() as string,
    phone: nano_int_id(10) as string,
  };
  const response = await db.insert(users).values(insert_values).returning().get();
  const result = new Response(JSON.stringify({ msg: 'Inserted successfully', response }), { status: 200 });
  return addCorsHeaders(result);
};
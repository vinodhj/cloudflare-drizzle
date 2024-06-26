import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { users } from '../db/schema';
import { addCorsHeaders } from '.';
import * as dbSchema from '../db/schema';
import { getTableColumns } from 'drizzle-orm';

export const handleDizzleRead = async (db: LibSQLDatabase<typeof dbSchema>): Promise<Response> => {
  const { id, ...defaultColumns } = getTableColumns(users);
  const response = await db
    .select({
      ...defaultColumns,
    })
    .from(users)
    .execute();
  const result = new Response(JSON.stringify({ msg: 'Read successfully', response }), { status: 200 });
  return addCorsHeaders(result);
};

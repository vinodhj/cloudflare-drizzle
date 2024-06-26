import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { DateTime } from 'luxon';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  created_at: integer('created_at', { mode: 'timestamp_ms' })
    .$default(() => DateTime.now().toJSDate() as Date)
    .notNull(),
  updated_at: integer('updated_at', { mode: 'timestamp_ms' })
    .$default(() => DateTime.now().toJSDate() as Date)
    .notNull(),
});

import { serial, varchar, mysqlTable } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise.js';

console.log("Setting up the table schema...");
export const signs = mysqlTable('signs', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }),
  description: varchar('description', { length: 255 }),
});
console.log("Table schema setup complete.");

console.log("Setting up the database connection pool...");
const poolConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'heartogether',
});
console.log("Database connection pool setup complete.");

console.log("Initializing Drizzle ORM...");
export const db = drizzle(poolConnection);
console.log("Drizzle ORM initialized.");

export async function insertSign(sign) {
  console.log("Inserting sign:", sign);
  const result = await db.insert(signs).values(sign);
  console.log("Insert result:", result);
  return result;
}
import type { Config } from 'drizzle-kit';
import { hostname } from 'os';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  dialect: 'mysql',
  dbCredentials: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'heartogether',
  }
  //driver: 'mysql2',
  /*dbCredentials: {
    url: './db/demo.db',
  },*/
} satisfies Config;
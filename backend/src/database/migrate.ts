import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { pool } from './database';

async function migrate() {
  const sql = fs.readFileSync(
    path.join(__dirname, 'schema.sql'),
    'utf8'
  );

  await pool.query(sql);
  console.log('Schema applied successfully.');
  await pool.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
  process.exit(1);
});

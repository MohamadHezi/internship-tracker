import { pool } from './database';

async function testConnection() {
  try {
    const result = await pool.query(
      'SELECT NOW()'
    );

    console.log(result.rows);
  } catch (error) {
    console.error(error);
  }
}

testConnection();
import { pool } from '../database/database';
import bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function createUser(email: string, password: string) {
  const passwordHash = await hashPassword(password);

  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, created_at;
    `,
    [email, passwordHash]
  );

  return result.rows[0];
}
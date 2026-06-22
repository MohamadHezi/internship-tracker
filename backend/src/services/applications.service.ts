import { Application } from '../types/application';
import { pool } from '../database/database';


export async function getAllApplications(): Promise<Application[]> {
  const result = await pool.query('SELECT * FROM applications');

  return result.rows;
}

export async function createApplication(
  company: string,
  position: string
): Promise<Application> {
  const result = await pool.query(
    `
    INSERT INTO applications
    (company, position, status)
    VALUES ($1, $2, $3)
    RETURNING *;
    `,
    [company, position, 'Applied']
  );

  return result.rows[0];
}

export async function deleteApplication(id: number): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM applications
    WHERE id = $1
    RETURNING *;
    `,
    [id]
  );

  return result.rowCount !== 0;
}

export async function updateApplication(
  id: number,
  company: string,
  position: string
): Promise<Application | null> {
  const result = await pool.query(
    `
    UPDATE applications
    SET company = $1,
        position = $2
    WHERE id = $3
    RETURNING *;
    `,
    [company, position, id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}
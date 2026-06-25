import { Application } from '../@types/application';
import { pool } from '../database/database';


export async function getAllApplications(userId: number): Promise<Application[]> {
  const result = await pool.query(
      `
      SELECT *
      FROM applications
      WHERE user_id = $1
      ORDER BY id DESC;
      `,
      [userId]
    );
  return result.rows;
}

export async function getApplicationById(id: number, userId: number) {
  const result = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE id = $1
      AND user_id = $2
    `,
    [id, userId]
  );

  return result.rows[0];
}

export async function createApplication(
  company: string,
  position: string,
  status: string,
  location: string,
  salary: string,
  notes: string,
  jobUrl: string,
  userId: number
): Promise<Application> {
  const result = await pool.query(
    `
    INSERT INTO applications
    (
      company,
      position,
      status,
      location,
      salary,
      notes,
      job_url,
      user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *;
    `,
    [
      company,
      position,
      status,
      location,
      salary,
      notes,
      jobUrl,
      userId,
    ]
  );

  return result.rows[0];
}

export async function deleteApplication(id: number): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM applications
    WHERE id = $1
    AND user_id = $2
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
    AND user_id = $4
    RETURNING *;
    `,
    [company, position, id]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return result.rows[0];
}

export async function uploadResume(
  applicationId: number,
  userId: number,
  filename: string
) {
  const result = await pool.query(
    `
    UPDATE applications
    SET resume_path = $1
    WHERE id = $2
      AND user_id = $3
    RETURNING *;
    `,
    [
      filename,
      applicationId,
      userId,
    ]
  );

  return result.rows[0];
}
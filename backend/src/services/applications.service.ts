import { Application } from '../@types/application';
import { pool } from '../database/database';
import { mapApplication } from '../utils/mapApplication';

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
  return result.rows.map(mapApplication);
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

  return result.rows[0]
    ? mapApplication(result.rows[0])
    : null;
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

  return mapApplication(result.rows[0]);
}

export async function deleteApplication(
  id: number,
 userId: number
): Promise<boolean> {
  const result = await pool.query(
    `
    DELETE FROM applications
    WHERE id = $1
      AND user_id = $2
    RETURNING *;
    `,
    [id, userId]
  );

  return result.rowCount !== 0;
}

export async function updateApplication(
  id: number,
  company: string,
  position: string,
  status: string,
  location: string,
  salary: string,
  notes: string,
  jobUrl: string,
  recruiterName: string | null,
  recruiterEmail: string | null,
  interviewDate: string | null,
  dateApplied: string | null,
  userId: number
): Promise<Application | null> {
  const result = await pool.query(
    `
    UPDATE applications
    SET
      company = $1,
      position = $2,
      status = $3,
      location = $4,
      salary = $5,
      notes = $6,
      job_url = $7,
      recruiter_name = $10,
      recruiter_email = $11,
      interview_date = $12,
      date_applied = $13
    WHERE id = $8
      AND user_id = $9
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
      id,
      userId,
      recruiterName,
      recruiterEmail,
      interviewDate,
      dateApplied,
    ]
  );

  if (result.rowCount === 0) {
    return null;
  }

  return mapApplication(result.rows[0]);
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

  return result.rows[0] ? mapApplication(result.rows[0]) : null;
}
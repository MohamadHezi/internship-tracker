import { pool } from '../database/database';

export async function getDashboardData(userId: number) {
  const totalApplications = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM applications
    WHERE user_id = $1
    `,
    [userId]
  );

  const interviews = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM applications
    WHERE user_id = $1
    AND status = 'Interview'
    `,
    [userId]
  );

  const offers = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM applications
    WHERE user_id = $1
    AND status = 'Offer'
    `,
    [userId]
  );

  const statusCounts = await pool.query(
    `
    SELECT
        status,
        COUNT(*) AS total
  FROM applications
  WHERE user_id = $1
  GROUP BY status
    `,
    [userId]
  );

  const recentApplications = await pool.query(
    `
    SELECT *
    FROM applications
    WHERE user_id = $1
    ORDER BY "dateApplied" DESC
    LIMIT 5
    `,
    [userId]
  );

  return {
    totalApplications: Number(totalApplications.rows[0].total),
    interviews: Number(interviews.rows[0].total),
    offers: Number(offers.rows[0].total),
    statusCounts: statusCounts.rows,
    recentApplications: recentApplications.rows,
  };
}
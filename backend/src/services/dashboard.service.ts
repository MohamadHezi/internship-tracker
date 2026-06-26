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

  const applicationsThisMonth = await pool.query(
    `
    SELECT COUNT(*) AS total
    FROM applications
    WHERE user_id = $1
      AND date_applied >= date_trunc('month', CURRENT_DATE)
    `,
    [userId]
  );

  const successRate =
    Number(totalApplications.rows[0].total) === 0
      ? 0
      : (
          (Number(offers.rows[0].total) /
            Number(totalApplications.rows[0].total)) *
          100
        ).toFixed(1);

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
    ORDER BY date_applied DESC
    LIMIT 5
    `,
    [userId]
  );

  return {
    totalApplications: Number(totalApplications.rows[0].total),
    interviews: Number(interviews.rows[0].total),
    offers: Number(offers.rows[0].total),
    applicationsThisMonth: Number(applicationsThisMonth.rows[0].total),
    successRate,
    statusCounts: statusCounts.rows,
    recentApplications: recentApplications.rows,
  };
}
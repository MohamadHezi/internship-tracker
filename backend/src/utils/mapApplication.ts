import { Application } from '../@types/application';

export function mapApplication(row: any): Application {
  return {
    id: row.id,
    company: row.company,
    position: row.position,
    status: row.status,
    userId: row.user_id,

    dateApplied: row.date_applied ?? null,

    location: row.location,
    salary: row.salary,
    notes: row.notes,

    recruiterName: row.recruiter_name,
    recruiterEmail: row.recruiter_email,
    interviewDate: row.interview_date,

    jobUrl: row.job_url,
    resumePath: row.resume_path,
  };
}
export interface Application {
  id: number;
  company: string;
  position: string;
  status: string;
  user_id: number;
  date_applied: string | null;
  location: string | null;
  salary: string | null;
  notes: string | null;
  recruiter_name: string | null;
  recruiter_email: string | null;
  interview_date: string | null;
  job_url: string | null;
  resume_path: string | null;
}
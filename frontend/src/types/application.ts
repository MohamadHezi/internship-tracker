export interface Application {
  id: number;

  company: string;
  position: string;
  status: string;

  dateApplied: string | null;

  location: string | null;
  salary: string | null;
  notes: string | null;

  recruiterName: string | null;
  recruiterEmail: string | null;
  interviewDate: string | null;

  jobUrl: string | null;
  resumePath: string | null;
}
import type { Application } from './application';

export interface StatusCount {
  status: string;
  total: string;
}

export interface DashboardData {
  totalApplications: number;
  interviews: number;
  offers: number;

  applicationsThisMonth: number;
  successRate: string;

  statusCounts: StatusCount[];
  recentApplications: Application[];
}
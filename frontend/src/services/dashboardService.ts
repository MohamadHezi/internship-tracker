import type { DashboardData } from '../types/dashboard';
import { apiFetch } from './api';

export async function getDashboard(): Promise<DashboardData> {
  return apiFetch<DashboardData>('/dashboard');
}
import { apiFetch } from './api';

export interface MatchResult {
  score: number;
  strengths: string[];
  gaps: string[];
  isMock: boolean;
}

export async function scoreMatch(applicationId: number, file: File): Promise<MatchResult> {
  const formData = new FormData();
  formData.append('resume', file);
  return apiFetch<MatchResult>(`/applications/${applicationId}/match`, {
    method: 'POST',
    body: formData,
  });
}

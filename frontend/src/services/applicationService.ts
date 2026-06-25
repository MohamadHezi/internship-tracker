import type { Application } from '../types/application';
import { apiFetch } from './api';


export async function getApplications(): Promise<Application[]> {
  return apiFetch<Application[]>('/applications');
}

export async function createApplication(
  company: string,
  position: string,
  status: string,
  location: string,
  salary: string,
  notes: string,
  jobUrl: string
): Promise<Application> {
  return apiFetch<Application>('/applications', {
    method: 'POST',
    body: JSON.stringify({
      company,
      position,
      status,
      location,
      salary,
      notes,
      job_url: jobUrl,
    }),
  });
}

export async function getApplication(id: number) {
  return apiFetch<Application>(
  `/applications/${id}`
);
}

export async function deleteApplication(id: number): Promise<void> {
  await apiFetch<void>(`/applications/${id}`,{
      method: 'DELETE',
    }
  );
}

export async function updateApplication(
  id: number,
  company: string,
  position: string,
  status: string,
  location: string,
  salary: string,
  notes: string,
  jobUrl: string
): Promise<Application> {
  return apiFetch<Application>(`/applications/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      company,
      position,
      status,
      location,
      salary,
      notes,
      job_url: jobUrl,
    }),
  });
}

export async function uploadResume(
  applicationId: number,
  file: File
): Promise<Application> {
  const formData = new FormData();

  formData.append('resume', file);

  return apiFetch<Application>(
    `/applications/${applicationId}/resume`,
    {
      method: 'POST',
      body: formData,
    }
  );
}
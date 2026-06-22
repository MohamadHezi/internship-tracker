import type { Application } from '../types/application';

const API_URL = 'http://localhost:3000';

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/applications`);
  const data = await response.json();
  return data;
}

export async function createApplication(
  company: string,
  position: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company,
      position,
    }),
  });

  return response.json();
}

export async function deleteApplication(id: number): Promise<void> {
  await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
  });
}

export async function updateApplication(
  id: number,
  company: string,
  position: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      company,
      position,
    }),
  });

  return response.json();
}
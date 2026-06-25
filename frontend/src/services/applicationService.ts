import type { Application } from '../types/application';

const API_URL = 'http://localhost:3000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(
    `${API_URL}/applications`,
    {
      headers: getAuthHeaders(),
    }
  );
  const data = await response.json();
  return data;
}

export async function createApplication(
  company: string,
  position: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      company,
      position,
    }),
  });

  return response.json();
}

export async function deleteApplication(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to delete application');
  }
}

export async function updateApplication(
  id: number,
  company: string,
  position: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({
      company,
      position,
    }),
  });

  return response.json();
}
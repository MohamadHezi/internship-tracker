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
  position: string,
  status: string,
  location: string,
  salary: string,
  notes: string,
  jobUrl: string
): Promise<Application> {
  const response = await fetch(`${API_URL}/applications`, {
    method: 'POST',
    headers: getAuthHeaders(),
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

  if (!response.ok) {
    throw new Error('Failed to create application');
  }

  return response.json();
}

export async function getApplication(id: number) {
  const response = await fetch(
    `${API_URL}/applications/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      'Failed to fetch application'
    );
  }

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

export async function uploadResume(
  applicationId: number,
  file: File
) {
  const formData = new FormData();

  formData.append('resume', file);

  const token = localStorage.getItem('token');

  const response = await fetch(
    `${API_URL}/applications/${applicationId}/resume`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload resume');
  }

  return response.json();
}
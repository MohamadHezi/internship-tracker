const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : {
            'Content-Type': 'application/json',
          }),
      ...getAuthHeaders(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
        const error = await response.json();

        if (error.message) {
        message = error.message;
        }
    } catch {
        // Ignore JSON parsing errors
    }

    throw new Error(message);
    }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}
// Thin fetch wrapper around the backend's /api/users REST endpoints.
// Base URL is configurable via VITE_API_BASE_URL (see client/.env.example)
// so it's easy to point at a different host/port without touching code.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/users';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed with status ${response.status}`);
  }

  return data;
}

export function fetchUsers() {
  return fetch(API_BASE_URL).then(handleResponse);
}

export function createUser(payload) {
  return fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

export function updateUser(id, payload) {
  return fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).then(handleResponse);
}

export function deleteUser(id) {
  return fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
}

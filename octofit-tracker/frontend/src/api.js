/**
 * Resolves the API base URL.
 * - Uses VITE_CODESPACE_NAME if defined, pointing to GitHub Codespaces port 8000.
 * - Falls back to http://localhost:8000 when running locally.
 *
 * Define VITE_CODESPACE_NAME in .env.local (do NOT commit that file):
 *   VITE_CODESPACE_NAME=your-codespace-name
 */
const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const API_BASE_URL =
  codespaceName && codespaceName !== 'undefined'
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

/**
 * Fetch a list from an API endpoint.
 * Handles both plain array responses and paginated { results: [] } shapes.
 */
export async function fetchList(path) {
  const res = await fetch(`${API_BASE_URL}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.results ?? data;
}

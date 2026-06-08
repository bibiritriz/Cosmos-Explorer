export const BASE_URL = 'https://api.nasa.gov';
export const API_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY ?? 'DEMO_KEY';

export function buildUrl(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

export async function fetchJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`NASA API error ${response.status}: ${response.statusText}`);
  }
  return response.json();
}

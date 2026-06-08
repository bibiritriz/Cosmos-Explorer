import { buildUrl, fetchJSON } from './httpClient';

export async function fetchNEO({ startDate, endDate } = {}) {
  const today = new Date().toISOString().split('T')[0];
  const url = buildUrl('/neo/rest/v1/feed', {
    start_date: startDate ?? today,
    end_date: endDate,
  });
  return fetchJSON(url);
}

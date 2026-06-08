import { buildUrl, fetchJSON } from './httpClient';

export async function fetchAPOD({ date, startDate, endDate, count, thumbs } = {}) {
  const url = buildUrl('/planetary/apod', {
    date,
    start_date: startDate,
    end_date: endDate,
    count,
    thumbs,
  });
  return fetchJSON(url);
}

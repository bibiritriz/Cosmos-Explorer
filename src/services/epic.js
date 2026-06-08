import { BASE_URL, API_KEY, buildUrl, fetchJSON } from './httpClient';

export async function fetchEPIC(date) {
  const path = date
    ? `/EPIC/api/natural/date/${date}`
    : '/EPIC/api/natural';
  return fetchJSON(buildUrl(path));
}

export function getEPICImageUrl(epicItem, date) {
  const [year, month, day] = date.split('-');
  return `${BASE_URL}/EPIC/archive/natural/${year}/${month}/${day}/png/${epicItem.image}.png?api_key=${API_KEY}`;
}

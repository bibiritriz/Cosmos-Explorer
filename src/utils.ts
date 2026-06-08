export function formatDate(iso: string): string {
  const datePart = iso.split('T')[0].split(' ')[0];
  const [year, month, day] = datePart.split('-');
  return `${day}/${month}/${year}`;
}

export function formatDateTime(iso: string): string {
  const [datePart, timePart] = iso.split(' ');
  const [year, month, day] = datePart.split('-');
  const time = timePart ? timePart.slice(0, 5) : '';
  return time ? `${day}/${month}/${year} ${time}` : `${day}/${month}/${year}`;
}

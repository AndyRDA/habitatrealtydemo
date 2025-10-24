export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
}
export function formatNumber(value) {
  if (value == null || value === '') return 'N/A';
  const num = Number(String(value).replace(/[, ]+/g, ''));
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat('en-ZA').format(num);
}
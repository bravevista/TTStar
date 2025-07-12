export function formatDate(dateInput: Date | string): string {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';
  const day = date.getDate();
  const monthNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  return `${day} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

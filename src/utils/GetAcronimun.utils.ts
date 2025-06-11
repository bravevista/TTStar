export function getAcronym(phrase: string): string {
  return phrase
    .split(' ')
    .filter(word => word[0] === word[0]?.toUpperCase())
    .map(word => word[0])
    .join('');
};

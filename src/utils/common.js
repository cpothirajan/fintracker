export function differenceInDays(date1, date2) {
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
export function compoundInterest(p, t, r, n) {
  const amount = p * Math.pow(1 + r / n, n * t);
  const interest = amount - p;
  return interest;
}
export default {
  differenceInDays,
  compoundInterest,
};

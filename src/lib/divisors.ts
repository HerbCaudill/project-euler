import { factors } from './factors';
export const divisors = (n: number): number[] => {
  if (n === 1)
    return [1];
  const uniqueFactors = new Set(factors(n));
  return [1, ...Array.from(uniqueFactors), n];
};

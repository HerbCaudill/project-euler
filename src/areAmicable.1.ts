import { properDivisors, sum, range } from './lib';
// Amicable numbers
// ================
// Let d(n) be defined as the sum of proper divisors of n (numbers less than
// n which divide evenly into n).
// If d(a) = b and d(b) = a, where a =/= b, then a and b are an amicable pair
// and each of a and b are called amicable numbers.
//
// For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22,
// 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1,
// 2, 4, 71 and 142; so d(284) = 220.
//
// Evaluate the sum of all the amicable numbers under 10000.
const areAmicable = (a: number, b: number) => d(a) === b && d(b) === a;
const d = (n: number): number => sum(properDivisors(n));
expect(d(220)).toEqual(284);
expect(d(284)).toEqual(220);
expect(areAmicable(220, 284)).toBeTruthy();
expect(areAmicable(284, 220)).toBeTruthy();
expect(areAmicable(284, 219)).toBeFalsy();
// For any given positive integer, returns a corresponding *smaller* amicable number if there is one
const amicablePair = (n: number): number[] => {
  const pair = range({ start: 1, stop: n - 1 }).find(n2 => areAmicable(n, n2));
  return pair ? [pair, n] : [];
};
expect(amicablePair(284)).toEqual([220, 284]);
expect(amicablePair(283)).toEqual([]);
// Returns all amicable numbers less than `max`
const allAmicables = (max: number): number[] => range({ start: 0, stop: max })
  .map(n => d(n))
  .reduce<number[]>((result, d, n, arr) => {
    const match = arr.findIndex((dd, nn) => dd === d && n !== nn);
    return match ? result.concat([n, match]) : result;
  }, []);
expect(allAmicables(300)).toEqual([220, 284]);

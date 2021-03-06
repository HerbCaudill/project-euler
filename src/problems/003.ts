import { primeFactors } from '../lib/primeFactors'

// Problem 3
// =========
// The prime factors of 13195 are 5, 7, 13 and 29.
// What is the largest prime factor of the number 600851475143?

export const solution003 = () => primeFactors(600851475143).pop()!

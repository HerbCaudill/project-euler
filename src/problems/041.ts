import { permutations } from 'lib/permutations'
import { isPrime } from 'lib/primes'
import { panDigitals } from 'lib/panDigital'

// Pandigital prime
// ================
// We shall say that an n-digit number is pandigital if it makes use of all
// the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital
// and is also prime.
//
// What is the largest n-digit pandigital prime that exists?

export const solution041 = () =>
  [9, 8, 7, 6]
    .map(panDigitals)
    .flat()
    .find(isPrime)

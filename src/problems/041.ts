import { panDigitals } from 'lib/panDigital'
import { isPrime } from 'lib/primes'

// Pandigital prime
// ================
// We shall say that an n-digit number is pandigital if it makes use of all
// the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital
// and is also prime.
//
// What is the largest n-digit pandigital prime that exists?

export const solution041 = () => {
  // try all 9-digit pandigitals, then all 8-digit, etc.
  let K = 9
  while (K > 0) {
    // get the pandigitals and order by size, with biggest first
    const candidates = panDigitals(K).sort((a, b) => b - a)
    // see if we have any primes
    const success = candidates.find(isPrime)
    if (success) return success
    // if not, try pandigitals with one less digit
    K -= 1
  }
  return undefined
}

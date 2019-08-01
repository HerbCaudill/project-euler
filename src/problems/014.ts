import { collatzLength } from '../lib/collatz'
import { range } from '../lib/range'

// Longest Collatz sequence
// ========================
// The following iterative sequence is defined for the set of positive
// integers:
//
// n->n/2 (n is even)
// n->3n+1 (n is odd)
//
// Using the rule above and starting with 13, we generate the following
// sequence:
//                   13->40->20->10->5->16->8->4->2->1
//
// It can be seen that this sequence (starting at 13 and finishing at 1)
// contains 10 terms. Although it has not been proved yet (Collatz Problem),
// it is thought that all starting numbers finish at 1.
//
// Which starting number, under one million, produces the longest chain?
//
// NOTE: Once the chain starts the terms are allowed to go above one million.

const largestChain = (n: number) => {
  const r = range({ start: n, stop: 1, step: -1 })
  return r.reduce(
    (max, n) => {
      const candidate = { n, length: collatzLength(n) }
      return candidate.length > max.length ? candidate : max
    },
    { n: 0, length: 0 }
  ).n
}

export const solution014 = () => largestChain(10 ** 6)

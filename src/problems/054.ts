import { hands as _hands } from '../resources/054'
// Poker hands
// ===========
// In the card game poker, a hand consists of five cards and are ranked, from
// lowest to highest, in the following way:
//
//   * High Card: Highest value card.
//   * One Pair: Two cards of the same value.
//   * Two Pairs: Two different pairs.
//   * Three of a Kind: Three cards of the same value.
//   * Straight: All cards are consecutive values.
//   * Flush: All cards of the same suit.
//   * Full House: Three of a kind and a pair.
//   * Four of a Kind: Four cards of the same value.
//   * Straight Flush: All cards are consecutive values of same suit.
//   * Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
//
// The cards are valued in the order:
// 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
//
// If two players have the same ranked hands then the rank made up of the
// highest value wins; for example, a pair of eights beats a pair of fives
// (see example 1 below). But if two ranks tie, for example, both players
// have a pair of queens, then highest cards in each hand are compared (see
// example 4 below); if the highest cards tie then the next highest cards are
// compared, and so on.
//
// Consider the following five hands dealt to two players:
//
//         Hand   Player 1            Player 2              Winner
//         1      5H 5C 6S 7S KD      2C 3S 8S 8D TD        Player 2
//                Pair of Fives       Pair of Eights
//
//         2      5D 8C 9S JS AC      2C 5C 7D 8S QH        Player 1
//                Highest card Ace    Highest card Queen
//
//         3      2D 9C AS AH AC      3D 6D 7D TD QD        Player 2
//                Three Aces          Flush with Diamonds
//
//                4D 6S 9H QH QC      3D 6D 7H QD QS
//         4      Pair of Queens      Pair of Queens        Player 1
//                Highest card Nine   Highest card Seven
//
//                2H 2D 4C 4D 4S      3C 3D 3S 9S 9D
//         5      Full House          Full House            Player 1
//                With Three Fours    with Three Threes
//
// The file poker.txt contains one-thousand random hands dealt to two players.
// Each line of the file contains ten cards (separated by a single space): the
// first five are Player 1's cards and the last five are Player 2's cards. You
// can assume that all hands are valid (no invalid characters or repeated
// cards), each player's hand is in no specific order, and in each hand there
// is a clear winner.
//
// How many hands does Player 1 win?

const score = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

type Suit = 'H' | 'D' | 'C' | 'D'
type Value = keyof typeof score
type Card = { suit: Suit; value: Value }
type Hand = Card[]

const parseCard = (card: string) => {
  const [value, suit] = card.split('') as [Value, Suit]
  return { value, suit } as Card
}

const parseHand = (hand: string) => hand.split(/\s+/).map(parseCard)

const hands = _hands.map(players => {
  const [p1, p2] = players.map(p => p.map(parseCard)) as [Hand, Hand]
  return { p1, p2 }
})

const countSets = (property: 'suit' | 'value', cards: Card[]) => {
  const result = {} as { [key: string]: number }
  for (const c of cards) result[c[property]] = (result[c[property]] || 0) + 1
  // only return sets with at least 2 cards
  for (const v in result) if (result[v] < 2) delete result[v]
  return result
}

/**
 * Counts sets of cards of the same value. Returns a map listing the number of cards in each set.
 * For example, a result of `{Q:2, J:3}` means there are two queens and three jacks.
 */
const valueSets = (cards: Card[]) => countSets('value', cards)
{
  // tests: valueSets
  expect(valueSets(parseHand('5H 5C 6S 7S KD'))).toEqual({ 5: 2 })
  expect(valueSets(parseHand('5D 8C 9S JS AC'))).toEqual({})
  expect(valueSets(parseHand('2D 9C AS AH AC'))).toEqual({ A: 3 })
  expect(valueSets(parseHand('4D 6S 9H QH QC'))).toEqual({ Q: 2 })
  expect(valueSets(parseHand('2H 2D 4C 4D 4S'))).toEqual({ 2: 2, 4: 3 })
  expect(valueSets(parseHand('2C 3S 8S 8D TD'))).toEqual({ 8: 2 })
  expect(valueSets(parseHand('2C 5C 7D 8S QH'))).toEqual({})
  expect(valueSets(parseHand('3D 6D 7D TD QD'))).toEqual({})
  expect(valueSets(parseHand('3D 6D 7H QD QS'))).toEqual({ Q: 2 })
  expect(valueSets(parseHand('3C 3D 3S 9S 9D'))).toEqual({ 3: 3, 9: 2 })
}

/**
 * Counts sets of cards of the same suit. Returns a map listing the number of cards in each set.
 * For example, a result of `{C:2}` means there are two clubs (and one of everything else).
 */
const suitSets = (cards: Card[]) => countSets('suit', cards)
{
  // tests: suitSets
  expect(suitSets(parseHand('5H 5C 6S 7S KD'))).toEqual({ S: 2 })
  expect(suitSets(parseHand('5D 8C 9S JS AC'))).toEqual({ S: 2, C: 2 })
  expect(suitSets(parseHand('2D 9C AS AH AC'))).toEqual({ C: 2 })
  expect(suitSets(parseHand('4D 6S 9H QH QC'))).toEqual({ H: 2 })
  expect(suitSets(parseHand('2H 2D 4C 4D 4S'))).toEqual({ D: 2 })
  expect(suitSets(parseHand('2C 3S 8S 8D TD'))).toEqual({ S: 2, D: 2 })
  expect(suitSets(parseHand('2C 5C 7D 8S QH'))).toEqual({ C: 2 })
  expect(suitSets(parseHand('3D 6D 7D TD QD'))).toEqual({ D: 5 })
  expect(suitSets(parseHand('3D 6D 7H QD QS'))).toEqual({ D: 3 })
  expect(suitSets(parseHand('3C 3D 3S 9S 9D'))).toEqual({ D: 2, S: 2 })
}

const highestValue = (cards: Card[]) =>
  Math.max(...cards.map(c => score[c.value]))

const rank: { [name: string]: (hand: Card[]) => number } = {
  // Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.           - same suit, consecutive
  // Straight Flush: All cards are consecutive values of same suit.    - same suit, consecutive
  // Four of a Kind: Four cards of the same value.                     - same value
  // Full House: Three of a kind and a pair.                           - same value

  // Flush: All cards of the same suit.                                - same suit
  flush: hand => {
    const counts = suitSets(hand)
    const suit = Object.keys(counts)[0]
    if (counts[suit] === 5) return highestValue(hand)
    else return 0
  },

  // Straight: All cards are consecutive values.                       - consecutive

  // Three of a Kind: Three cards of the same value.                   - same value

  // Two Pairs: Two different pairs.                                   - same value
  twopairs: hand => {
    const counts = valueSets(hand)
    const values = Object.keys(counts)
    if (values.length === 2) {
      const v1 = values[0] as Value
      const v2 = values[1] as Value
      if (counts[v1] === 2 && counts[v2] === 2)
        return Math.max(score[v1], score[v2])
    }
    return 0
  },

  // One Pair: Two cards of the same value.                            - same value
  pair: hand => {
    const counts = valueSets(hand)
    const values = Object.keys(counts)
    const value = values[0] as Value
    if (values.length === 1 && counts[value] === 2) return score[value]
    return 0
  },

  // High Card: Highest value card.                                    -
}
{
  {
    // flush
    expect(rank.flush(parseHand('5H 5C 6S 7S KD'))).toEqual(0)
    expect(rank.flush(parseHand('5D 8C 9S JS AC'))).toEqual(0)
    expect(rank.flush(parseHand('2D 9C AS AH AC'))).toEqual(0)
    expect(rank.flush(parseHand('4D 6S 9H QH QC'))).toEqual(0)
    expect(rank.flush(parseHand('2H 2D 4C 4D 4S'))).toEqual(0)
    expect(rank.flush(parseHand('2C 3S 8S 8D TD'))).toEqual(0)
    expect(rank.flush(parseHand('2C 5C 7D 8S QH'))).toEqual(0)
    expect(rank.flush(parseHand('3D 6D 7D TD QD'))).toEqual(12) // flush with diamonds; queen
    expect(rank.flush(parseHand('3D 6D 7H QD QS'))).toEqual(0)
    expect(rank.flush(parseHand('3C 3D 3S 9S 9D'))).toEqual(0)
  }
  {
    // twopairs
    expect(rank.twopairs(parseHand('5H 5C 6S 6S KD'))).toEqual(6) // pair of fives, pair of sixes
    expect(rank.twopairs(parseHand('5H 5C 6S 7S KD'))).toEqual(0)
    expect(rank.twopairs(parseHand('5D 8C 9S JS AC'))).toEqual(0)
    expect(rank.twopairs(parseHand('2D 9C AS AH AC'))).toEqual(0)
    expect(rank.twopairs(parseHand('4D 6S 9H QH QC'))).toEqual(0)
    expect(rank.twopairs(parseHand('2H 2D 4C 4D 4S'))).toEqual(0)
    expect(rank.twopairs(parseHand('2C 3S 8S 8D TD'))).toEqual(0)
    expect(rank.twopairs(parseHand('2C 5C 7D 8S QH'))).toEqual(0)
    expect(rank.twopairs(parseHand('3D 6D 7D TD QD'))).toEqual(0)
    expect(rank.twopairs(parseHand('3D 6D 7H QD QS'))).toEqual(0)
    expect(rank.twopairs(parseHand('3C 3D 3S 9S 9D'))).toEqual(0)
  }
  {
    // pair
    expect(rank.pair(parseHand('5H 5C 6S 7S KD'))).toEqual(5)
    expect(rank.pair(parseHand('5D 8C 9S JS AC'))).toEqual(0)
    expect(rank.pair(parseHand('2D 9C AS AH AC'))).toEqual(0)
    expect(rank.pair(parseHand('4D 6S 9H QH QC'))).toEqual(12) // pair of queens
    expect(rank.pair(parseHand('2H 2D 4C 4D 4S'))).toEqual(0)
    expect(rank.pair(parseHand('2C 3S 8S 8D TD'))).toEqual(8) // pair of eights
    expect(rank.pair(parseHand('2C 5C 7D 8S QH'))).toEqual(0)
    expect(rank.pair(parseHand('3D 6D 7D TD QD'))).toEqual(0)
    expect(rank.pair(parseHand('3D 6D 7H QD QS'))).toEqual(12) // pair of queens
    expect(rank.pair(parseHand('3C 3D 3S 9S 9D'))).toEqual(0)
  }
}

export const solution054 = () => -1

import { games_raw } from '../resources/054'
import { range } from 'lib/range'

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

const ascending = (a: number, b: number) => a - b
const descending = (a: number, b: number) => b - a

type Suit = 'H' | 'D' | 'C' | 'D'
type Value = keyof typeof score
type Card = { suit: Suit; value: Value }
type Hand = Card[]

const parseCard = (card: string) => {
  const [value, suit] = card.split('') as [Value, Suit]
  return { value, suit } as Card
}
const parse = (hand: string) => hand.split(/\s+/).map(parseCard)

/**
 * Counts sets of cards of the same value. Returns a map listing the number of cards in each set.
 * For example, a result of `{Q:2, J:3}` means there are two queens and three jacks.
 */
const valueSets = (cards: Hand) => {
  const result = {} as { [key: string]: number }
  for (const c of cards) result[c.value] = (result[c.value] || 0) + 1
  // only return sets with at least 2 cards
  for (const v in result) if (result[v] < 2) delete result[v]
  return result
}
{
  // tests: valueSets
  expect(valueSets(parse('5H 5C 6S 7S KD'))).toEqual({ 5: 2 })
  expect(valueSets(parse('5D 8C 9S JS AC'))).toEqual({})
  expect(valueSets(parse('2D 9C AS AH AC'))).toEqual({ A: 3 })
  expect(valueSets(parse('4D 6S 9H QH QC'))).toEqual({ Q: 2 })
  expect(valueSets(parse('2H 2D 4C 4D 4S'))).toEqual({ 2: 2, 4: 3 })
  expect(valueSets(parse('2C 3S 8S 8D TD'))).toEqual({ 8: 2 })
  expect(valueSets(parse('2C 5C 7D 8S QH'))).toEqual({})
  expect(valueSets(parse('3D 6D 7D TD QD'))).toEqual({})
  expect(valueSets(parse('3D 6D 7H QD QS'))).toEqual({ Q: 2 })
  expect(valueSets(parse('3C 3D 3S 9S 9D'))).toEqual({ 3: 3, 9: 2 })
}

const handValues = (hand: Hand) =>
  hand.map(c => score[c.value]).sort(descending)
{
  expect(handValues(parse('TD JD QD KD AD'))).toEqual([14, 13, 12, 11, 10])
}

/** returns the highest value in the hand */
const high = (hand: Hand) => handValues(hand)[0]
{
  expect(high(parse('TD JD QD KD AD'))).toBe(14)
}

/** returns true if all cards are of the same suit */
const flush = (cards: Hand) => new Set(cards.map(c => c.suit)).size === 1

/** returns true if cards all have consecutive values */
const straight = (cards: Hand) =>
  !handValues(cards).some((_, i, v) => i > 0 && v[i - 1] - v[i] !== 1)
{
  expect(straight(parse('7S 8H 9S TS JC'))).toBe(true)
  expect(straight(parse('6S 7S 8H 9S TS'))).toBe(true)
}

type Sets = { [key: string]: number[] }
const sets = (hand: Hand) => {
  const values = handValues(hand)
  const result = { 5: [], 4: [], 3: [], 2: [], 1: [] } as Sets
  for (const value of new Set(values)) {
    const count = values.filter(v => v === value).length
    result[count].push(value)
  }
  return result
}

//** higher-order-function for pair, three of a kind, four of a kind */
const ofAKind = (count1: 2 | 3 | 4) => (hand: Hand) => {
  const set = sets(hand)[count1]
  return set.length === 1 ? set[0] : 0
}

interface RankDefinition {
  evaluate: (hand: Hand) => number
  example: { hand: string; highCard: number }
}

const ranks: { [key: string]: RankDefinition } = {
  royal_flush: {
    evaluate: h => (flush(h) && straight(h) && high(h) > 13 ? 14 : 0),
    example: { hand: 'TD JD QD KD AD', highCard: 14 },
  },

  straight_flush: {
    evaluate: h => (flush(h) && straight(h) && high(h) < 14 ? high(h) : 0),
    example: { hand: '5C 6C 7C 8C 9C', highCard: 9 },
  },

  four_of_a_kind: {
    evaluate: ofAKind(4),
    example: { hand: '7D 7C 7H 7S AH', highCard: 7 },
  },

  full_house: {
    evaluate: hand => {
      const three = sets(hand)[3]
      const pair = sets(hand)[2]
      return three.length === 1 && pair.length === 1 ? three[0] : 0
    },
    example: { hand: '4H 4D 4S AD AC', highCard: 4 },
  },

  flush: {
    evaluate: hand => (flush(hand) && !straight(hand) ? high(hand) : 0),
    example: { hand: 'AH 3H 7H 8H JH', highCard: 14 },
  },

  straight: {
    evaluate: hand => (straight(hand) && !flush(hand) ? high(hand) : 0),
    example: { hand: '4H 5D 6D 7H 8C', highCard: 8 },
  },

  three_of_a_kind: {
    evaluate: ofAKind(3),
    example: { hand: 'QH QD QS 2H 5S', highCard: 12 },
  },

  two_pairs: {
    evaluate: hand => {
      const pairs = sets(hand)[2]
      return pairs.length === 2 ? Math.max(...pairs) : 0
    },
    example: { hand: 'QH QD 2H 2S AH', highCard: 12 },
  },

  one_pair: {
    evaluate: ofAKind(2),
    example: { hand: 'JH JS 3H 2D AH', highCard: 11 },
  },

  high_card: {
    evaluate: high,
    example: { hand: 'JH QS 3H 2D AH', highCard: 14 },
  },
}
{
  // test all of our examples to make sure each evaluator returns true for its example
  for (const key in ranks) {
    const { evaluate, example } = ranks[key]
    const { hand, highCard } = example
    const result = evaluate(parse(hand))
    // if (result !== highCard) console.log({ hand, key, result, highCard })
    expect(result).toEqual(highCard)
  }

  // other cases
  expect(ranks.one_pair.evaluate(parse('2H 2D 3H 5H 7H'))).toBe(2)
  expect(ranks.straight.evaluate(parse('6S 7S 8H 9S TS'))).toBe(10)
}

/** Each hand has a score in array form. The first element is the rank of the hand (royal flush = 14,
 * straight flush = 13, etc.); the second is the value of the hand (e.g. 5 for a pair of fives,
 * etc.) Then we append all of the hand's values in descending order to use as tiebreakers. Finally
 * we pad the array's values with zeroes because arrays are compared lexically.  */
const handScore = (hand: Hand) => {
  const pad = (n: number) => n.toString().padStart(3, '0')
  let rankValue = Object.keys(ranks).length
  for (const key in ranks) {
    const highCardValue = ranks[key].evaluate(hand)
    if (highCardValue > 0)
      return [rankValue, highCardValue, ...handValues(hand)].map(pad)
    rankValue -= 1
  }
  throw new Error('Every hand has a score')
}

/** Returns true if the first hand beats the second. */
const wins = ([hand1, hand2]: [Hand, Hand]) =>
  handScore(hand1) > handScore(hand2)

{
  // test provided examples
  expect(wins([parse('5H 5C 6S 7S KD'), parse('2C 3S 8S 8D TD')])).toBe(false) // pair of eights > pair of fives
  expect(wins([parse('5D 8C 9S JS AC'), parse('2C 5C 7D 8S QH')])).toBe(true) //  high card ace > high card queen
  expect(wins([parse('2D 9C AS AH AC'), parse('3D 6D 7D TD QD')])).toBe(false) // flush > three of a kind
  expect(wins([parse('4D 6S 9H QH QC'), parse('3D 6D 7H QD QS')])).toBe(true) //  pair of queens, tiebreaker: nine > seven
  expect(wins([parse('2H 2D 4C 4D 4S'), parse('3C 3D 3S 9S 9D')])).toBe(true) //  full house, four > full house, three

  // other examples
  expect(wins([parse('2H 2D 9H 8D 3S'), parse('2C 2S 9C 9D 3C')])).toBe(false) // tiebreaker: 9C 9D > 9H 8D
  expect(wins([parse('2H 2D JH 4D 3S'), parse('2C 2S TH 4C 3D')])).toBe(true) //  tiebreaker: jack > ten
  expect(wins([parse('6S 7S 8H 9S TS'), parse('3C 7H 8C QH AH')])).toBe(true) //  straight (ten) > queen
  expect(wins([parse('3S 5D 5H 6D 7C'), parse('2H 3D 5C 5S JC')])).toBe(false) // pair of five, tiebreaker: jack > seven
}

const games = games_raw
  .trim()
  .split(/\n/) // split into rows, each row is a game
  .map(row => row.split(/\s+/)) // split into cards
  .map(arr => [arr.slice(0, 5), arr.slice(5)]) // cut into two hands
  .map(r => r.map(p => p.map(parseCard)) as [Hand, Hand]) // parse cards

export const solution054 = () => games.filter(wins).length

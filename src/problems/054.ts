import { games_raw } from '../resources/054'

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
const parse = (hand: string) => hand.split(/\s+/).map(parseCard)

const byScore = (a: Card, b: Card) => score[a.value] - score[b.value]

/** Helper for valueSets & suitSets */
const countSets = (property: 'suit' | 'value', cards: Hand) => {
  const result = {} as { [key: string]: number }
  for (const c of cards.sort(byScore))
    result[c[property]] = (result[c[property]] || 0) + 1
  // only return sets with at least 2 cards
  for (const v in result) if (result[v] < 2) delete result[v]
  return result
}

/**
 * Counts sets of cards of the same value. Returns a map listing the number of cards in each set.
 * For example, a result of `{Q:2, J:3}` means there are two queens and three jacks.
 */
const valueSets = (cards: Hand) => countSets('value', cards)
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

/**
 * Counts sets of cards of the same suit. Returns a map listing the number of cards in each set.
 * For example, a result of `{C:2}` means there are two clubs (and one of everything else).
 */
const suitSets = (cards: Hand) => countSets('suit', cards)
{
  // tests: suitSets
  expect(suitSets(parse('5H 5C 6S 7S KD'))).toEqual({ S: 2 })
  expect(suitSets(parse('5D 8C 9S JS AC'))).toEqual({ S: 2, C: 2 })
  expect(suitSets(parse('2D 9C AS AH AC'))).toEqual({ C: 2 })
  expect(suitSets(parse('4D 6S 9H QH QC'))).toEqual({ H: 2 })
  expect(suitSets(parse('2H 2D 4C 4D 4S'))).toEqual({ D: 2 })
  expect(suitSets(parse('2C 3S 8S 8D TD'))).toEqual({ S: 2, D: 2 })
  expect(suitSets(parse('2C 5C 7D 8S QH'))).toEqual({ C: 2 })
  expect(suitSets(parse('3D 6D 7D TD QD'))).toEqual({ D: 5 })
  expect(suitSets(parse('3D 6D 7H QD QS'))).toEqual({ D: 3 })
  expect(suitSets(parse('3C 3D 3S 9S 9D'))).toEqual({ D: 2, S: 2 })
}

/** returns the highest  */
const highestValue = (cards: Hand) =>
  Math.max(...cards.map(c => score[c.value]))

/** returns true if all cards are of the same suit */
const isFlush = (cards: Hand) => {
  const counts = suitSets(cards)
  const suit = Object.keys(counts)[0]
  return counts[suit] === 5
}

const ascending = (a: number, b: number) => a - b

/** returns true if cards all have consecutive values */
const isStraight = (cards: Hand) => {
  const scores = cards.map(c => score[c.value]).sort(ascending)
  return !scores.some((_, i, arr) => i > 0 && arr[i] - arr[i - 1] !== 1)
}
{
  expect(isStraight(parse('7S 8H 9S TS JC'))).toBe(true)
  expect(isStraight(parse('6S 7S 8H 9S TS'))).toBe(true)
}

//** higher-order-function for rank functions pair, three of a kind, four of a kind */
const ofAKind = (count1: 2 | 3 | 4, count2?: 2 | 3) => (hand: Hand) => {
  const counts = valueSets(hand)
  const values = Object.keys(counts).sort((a, b) => counts[b] - counts[a]) // order keys in descending order of count, because we call ofAKind(3,2) and not (2,3)
  const value1 = values[0] as Value
  if (counts[value1] === count1) {
    if (count2 === undefined && values.length === 1) return score[value1]
    else {
      const value2 = values[1] as Value
      if (counts[value2] === count2)
        return count1 === count2
          ? Math.max(score[value1], score[value2])
          : score[value1]
    }
  }
  return 0
}

interface RankDefinition {
  name: string
  description: string
  value: number
  evaluator: (hand: Hand) => number
  example: {
    hand: Hand
    highCard: number
  }
}

const ranks: { [key: string]: RankDefinition } = {
  royal_flush: {
    name: 'Royal Flush',
    description: 'Ten, Jack, Queen, King, Ace, in same suit.',
    value: 900,
    evaluator: hand =>
      isFlush(hand) && isStraight(hand) && highestValue(hand) === 14 ? 14 : 0,
    example: {
      hand: parse('TD JD QD KD AD'),
      highCard: 14,
    },
  },

  straight_flush: {
    name: 'Straight Flush',
    description: 'All cards are consecutive values of same suit.',
    value: 800,
    evaluator: hand =>
      isFlush(hand) && isStraight(hand) && highestValue(hand) < 14
        ? highestValue(hand)
        : 0,
    example: {
      hand: parse('5C 6C 7C 8C 9C'),
      highCard: 9,
    },
  },

  four_of_a_kind: {
    name: 'Four of a Kind',
    description: 'Four cards of the same value.',
    value: 700,
    evaluator: ofAKind(4),
    example: {
      hand: parse('7D 7C 7H 7S AH'),
      highCard: 7,
    },
  },

  full_house: {
    name: 'Full House',
    description: 'Three of a kind and a pair.',
    value: 600,
    evaluator: ofAKind(3, 2),
    example: {
      hand: parse('4H 4D 4S AD AC'),
      highCard: 4,
    },
  },

  flush: {
    name: 'Flush',
    description: 'All cards of the same suit.',
    value: 500,
    evaluator: hand =>
      isFlush(hand) && !isStraight(hand) ? highestValue(hand) : 0,
    example: {
      hand: parse('AH 3H 7H 8H JH'),
      highCard: 14,
    },
  },

  straight: {
    name: 'Straight',
    description: 'All cards are consecutive values.',
    value: 400,
    evaluator: hand =>
      isStraight(hand) && !isFlush(hand) ? highestValue(hand) : 0,
    example: {
      hand: parse('4H 5D 6D 7H 8C'),
      highCard: 8,
    },
  },

  three_of_a_kind: {
    name: 'Three of a Kind',
    description: 'Three cards of the same value.',
    value: 300,
    evaluator: ofAKind(3),
    example: {
      hand: parse('QH QD QS 2H 5S'),
      highCard: 12,
    },
  },

  two_pairs: {
    name: 'Two Pairs',
    description: 'Two different pairs.',
    value: 200,
    evaluator: ofAKind(2, 2),
    example: {
      hand: parse('QH QD 2H 2S AH'),
      highCard: 12,
    },
  },

  one_pair: {
    name: 'One Pair',
    description: 'Two cards of the same value.',
    value: 100,
    evaluator: ofAKind(2),
    example: {
      hand: parse('JH JS 3H 2D AH'),
      highCard: 11,
    },
  },

  high_card: {
    name: 'High Card',
    description: 'Highest value card.',
    value: 0,
    evaluator: hand => {
      const noneOfAKind = Object.keys(valueSets(hand)).length === 0
      return noneOfAKind && !isFlush(hand) && !isStraight(hand)
        ? highestValue(hand)
        : 0
    },
    example: {
      hand: parse('JH QS 3H 2D AH'),
      highCard: 14,
    },
  },
}
{
  // test all of our examples to make sure each evaluator only gets a hit on its own example
  for (const testKey in ranks)
    for (const exampleKey in ranks) {
      const { hand, highCard } = ranks[exampleKey].example
      const result = ranks[testKey].evaluator(hand)
      const expected = testKey === exampleKey ? highCard : 0
      expect(result).toEqual(expected)
    }

  // other cases
  expect(ranks.one_pair.evaluator(parse('2H 2D 3H 5H 7H'))).toBe(2)
  expect(ranks.straight.evaluator(parse('6S 7S 8H 9S TS'))).toBe(10)
}

const handScore = (hand: Hand) => {
  for (const key in ranks) {
    const rank = ranks[key]
    const highCardValue = rank.evaluator(hand)
    if (highCardValue > 0) return rank.value + highCardValue
  }
  throw new Error('Every hand has a score')
}
{
  expect(handScore(ranks.royal_flush.example.hand)).toBe(914)
  expect(handScore(ranks.straight_flush.example.hand)).toBe(809)
  expect(handScore(ranks.four_of_a_kind.example.hand)).toBe(707)
  expect(handScore(ranks.full_house.example.hand)).toBe(604)
  expect(handScore(ranks.flush.example.hand)).toBe(514)
  expect(handScore(ranks.straight.example.hand)).toBe(408)
  expect(handScore(ranks.three_of_a_kind.example.hand)).toBe(312)
  expect(handScore(ranks.two_pairs.example.hand)).toBe(212)
  expect(handScore(ranks.one_pair.example.hand)).toBe(111)
  expect(handScore(ranks.high_card.example.hand)).toBe(14)
}

const last = (arr: number[]) => arr[arr.length - 1]
/** returns true if the first hand beats the second */
const p1Wins = ([p1, p2]: [Hand, Hand]) => {
  const s1 = handScore(p1)
  const s2 = handScore(p2)
  // do we need a tiebreaker?
  if (s1 === s2) {
    // create sorted clones
    const h1 = p1.map(card => score[card.value]).sort(ascending)
    const h2 = p2.map(card => score[card.value]).sort(ascending)

    // compare the highest (last) values until we find two that are different
    while (last(h1) === last(h2)) {
      h1.pop()
      h2.pop()
    }
    const result = last(h1) > last(h2)
    // console.log('tiebreaker', { p1, p2, s1, s2, h1, h2, result })
    return result
  } else return s1 > s2
}

{
  // test provided examples
  expect(p1Wins([parse('5H 5C 6S 7S KD'), parse('2C 3S 8S 8D TD')])).toBe(false) // pair of eights > pair of fives
  expect(p1Wins([parse('5D 8C 9S JS AC'), parse('2C 5C 7D 8S QH')])).toBe(true) //  high card ace > high card queen
  expect(p1Wins([parse('2D 9C AS AH AC'), parse('3D 6D 7D TD QD')])).toBe(false) // flush > three of a kind
  expect(p1Wins([parse('4D 6S 9H QH QC'), parse('3D 6D 7H QD QS')])).toBe(true) //  pair of queens, tiebreaker: nine > seven
  expect(p1Wins([parse('2H 2D 4C 4D 4S'), parse('3C 3D 3S 9S 9D')])).toBe(true) //  full house, four > full house, three

  // other examples
  expect(p1Wins([parse('2H 2D 9H 8D 3S'), parse('2C 2S 9C 9D 3C')])).toBe(false) // tiebreaker: 9C 9D > 9H 8D
  expect(p1Wins([parse('2H 2D JH 4D 3S'), parse('2C 2S TH 4C 3D')])).toBe(true) //  tiebreaker: jack > ten
  expect(p1Wins([parse('6S 7S 8H 9S TS'), parse('3C 7H 8C QH AH')])).toBe(true) //  straight (ten) > queen
  expect(p1Wins([parse('3S 5D 5H 6D 7C'), parse('2H 3D 5C 5S JC')])).toBe(false) // pair of five, tiebreaker: jack > seven
}

const games = games_raw
  .trim()
  .split(/\n/)
  .map(row => row.split(/\s+/))
  .map(arr => [arr.slice(0, 5), arr.slice(5)])
  .map(r => r.map(p => p.map(parseCard)) as [Hand, Hand])

// const stringify = (hand: Hand) => hand.map(c => `${c.value}${c.suit}`).join(' ')
// console.log(games.filter(g => p1Wins(g)).map(g => g.map(stringify).join('  ')))

export const solution054 = () => games.filter(p1Wins).length

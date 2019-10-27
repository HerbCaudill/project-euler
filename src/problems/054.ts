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

const countSets = (property: 'suit' | 'value', cards: Hand) => {
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
const valueSets = (cards: Hand) => countSets('value', cards)
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
const suitSets = (cards: Hand) => countSets('suit', cards)
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

/** returns the highest  */
const highestValue = (cards: Hand) =>
  Math.max(...cards.map(c => score[c.value]))

/** returns true if all cards are of the same suit */
const isFlush = (cards: Hand) => {
  const counts = suitSets(cards)
  const suit = Object.keys(counts)[0]
  return counts[suit] === 5
}

/** returns true if cards all have consecutive values */
const isStraight = (cards: Hand) => {
  const scores = cards.map(c => score[c.value])
  return !scores.sort().some((_, i, arr) => i > 0 && arr[i] - arr[i - 1] !== 1)
}

//** higher-order-function for rank functions pair, three of a kind, four of a kind */
const ofAKind = (count1: 2 | 3 | 4, count2?: 2 | 3) => (hand: Hand) => {
  const counts = valueSets(hand)
  const values = Object.keys(counts)
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
      hand: parseHand('TD JD QD KD AD'),
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
      hand: parseHand('5C 6C 7C 8C 9C'),
      highCard: 9,
    },
  },

  four_of_a_kind: {
    name: 'Four of a Kind',
    description: 'Four cards of the same value.',
    value: 700,
    evaluator: ofAKind(4),
    example: {
      hand: parseHand('7D 7C 7H 7S AH'),
      highCard: 7,
    },
  },

  full_house: {
    name: 'Full House',
    description: 'Three of a kind and a pair.',
    value: 600,
    evaluator: ofAKind(3, 2),
    example: {
      hand: parseHand('4H 4D 4S AD AC'),
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
      hand: parseHand('AH 3H 7H 8H JH'),
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
      hand: parseHand('4H 5D 6D 7H 8C'),
      highCard: 8,
    },
  },

  three_of_a_kind: {
    name: 'Three of a Kind',
    description: 'Three cards of the same value.',
    value: 300,
    evaluator: ofAKind(3),
    example: {
      hand: parseHand('QH QD QS 2H 5S'),
      highCard: 12,
    },
  },

  two_pairs: {
    name: 'Two Pairs',
    description: 'Two different pairs.',
    value: 200,
    evaluator: ofAKind(2, 2),
    example: {
      hand: parseHand('QH QD 2H 2S AH'),
      highCard: 12,
    },
  },

  one_pair: {
    name: 'One Pair',
    description: 'Two cards of the same value.',
    value: 100,
    evaluator: ofAKind(2),
    example: {
      hand: parseHand('JH JS 3H 2D AH'),
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
      hand: parseHand('JH QS 3H 2D AH'),
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
}

const scoreHand = (hand: Hand) => {
  for (const key in ranks) {
    const rank = ranks[key]
    const highCardValue = rank.evaluator(hand)
    if (highCardValue > 0) return rank.value + highCardValue
  }
  throw new Error('Every hand has a score')
}
{
  expect(scoreHand(ranks.royal_flush.example.hand)).toBe(914)
  expect(scoreHand(ranks.straight_flush.example.hand)).toBe(809)
  expect(scoreHand(ranks.four_of_a_kind.example.hand)).toBe(707)
  expect(scoreHand(ranks.full_house.example.hand)).toBe(604)
  expect(scoreHand(ranks.flush.example.hand)).toBe(514)
  expect(scoreHand(ranks.straight.example.hand)).toBe(408)
  expect(scoreHand(ranks.three_of_a_kind.example.hand)).toBe(312)
  expect(scoreHand(ranks.two_pairs.example.hand)).toBe(212)
  expect(scoreHand(ranks.one_pair.example.hand)).toBe(111)
  expect(scoreHand(ranks.high_card.example.hand)).toBe(14)
}

export const solution054 = () => -1

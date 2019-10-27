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

const values = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

type Suit = 'H' | 'D' | 'C' | 'D'
type Value = keyof typeof values
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

// # same suit
// # same value
// # consecutive

const valueSets = (cards: Card[]) => {
  const result = {} as { [value: string]: number }
  for (const c of cards) result[c.value] = (result[c.value] || 0) + 1
  for (const v in result) if (result[v] < 2) delete result[v]
  return result
}

expect(valueSets(parseHand('4D 6S 9H QH QC'))).toEqual({ Q: 2 })

const ranks = {
  // Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.
  // Straight Flush: All cards are consecutive values of same suit.
  // Four of a Kind: Four cards of the same value.
  // Full House: Three of a kind and a pair.
  // Flush: All cards of the same suit.
  // Straight: All cards are consecutive values.
  // Three of a Kind: Three cards of the same value.
  // Two Pairs: Two different pairs.
  // One Pair: Two cards of the same value.
  // High Card: Highest value card.
}

export const solution054 = () => -1

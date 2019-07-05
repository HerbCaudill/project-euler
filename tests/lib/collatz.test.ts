import { collatzLength, collatz, clearCache } from '../../src/lib/collatz'

describe('collatz', () => {
  test('2', () => expect(collatz(2)).toEqual([2, 1]))
  test('13', () =>
    expect(collatz(13)).toEqual([13, 40, 20, 10, 5, 16, 8, 4, 2, 1]))
  test('837799', () => expect(collatz(837799)).toHaveLength(525))
  test('1 million', () => expect(collatz(10 ** 6)).toHaveLength(153))
  test('75,128,138,247', () => expect(collatz(75128138247)).toHaveLength(1229))

  // afterAll(saveCache)
})

describe('collatzLength', () => {
  test('13', () => expect(collatzLength(13)).toEqual(10))

  test('837799', () => expect(collatzLength(837799)).toEqual(525))
  test('1 million', () => expect(collatzLength(10 ** 6)).toEqual(153))

  // largest path for n in javascript integer space
  test('75,128,138,247', () => expect(collatzLength(75128138247)).toEqual(1229))
})

beforeEach(clearCache)

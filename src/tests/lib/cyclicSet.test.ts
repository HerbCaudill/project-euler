import {
  cyclicSets,
  isCyclic,
  get1stHalf,
  get2ndHalf,
} from '../../lib/cyclicSet'

describe('get1stHalf', () => {
  it('1234', () => expect(get1stHalf(1234)).toBe(12))
  it('123456', () => expect(get1stHalf(123456)).toBe(123))
})

describe('get2ndHalf', () => {
  it('1234', () => expect(get2ndHalf(1234)).toBe(34))
  it('123456', () => expect(get2ndHalf(123456)).toBe(456))
})

describe('isCyclic', () => {
  it('not same length', () =>
    expect(() => isCyclic([8128, 2882, 82811])).toThrow())
  it('odd length', () => expect(() => isCyclic([123, 234, 345])).toThrow())
  it('not cyclic', () => expect(isCyclic([8128, 2883, 8281])).toBe(false))
  it('cyclic', () => expect(isCyclic([8128, 2882, 8281])).toBe(true))
})

describe('cyclicSets', () => {
  it('3,3', () => expect(() => cyclicSets(3, 3)).toThrow())

  it('4,3', () =>
    expect(cyclicSets(4, 3).slice(0, 4)).toEqual([
      [1011, 1112, 1210],
      [1011, 1113, 1310],
      [1011, 1114, 1410],
      [1011, 1115, 1510],
    ]))

  // out of memory
  // it('4,6', () =>
  //   expect(cyclicSets(4, 6).slice(0, 4)).toEqual([
  //     [1011, 1112, 1210],
  //     [1011, 1113, 1310],
  //     [1011, 1114, 1410],
  //     [1011, 1115, 1510],
  //   ]))
})

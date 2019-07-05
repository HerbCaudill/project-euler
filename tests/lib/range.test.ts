import { range, RangeProps } from '../../src/lib/range'

describe('range', () => {
  const makeTest = (rangeProps: RangeProps, result: number[]) =>
    test(JSON.stringify(rangeProps), () =>
      expect(range(rangeProps)).toEqual(result)
    )

  makeTest({ start: 1, stop: 5 }, [1, 2, 3, 4, 5])
  makeTest({ start: 2, stop: 10, step: 2 }, [2, 4, 6, 8, 10])
  makeTest({ start: 10, stop: 15 }, [10, 11, 12, 13, 14, 15])
  makeTest({ step: 3, stop: 10 }, [0, 3, 6, 9])
  makeTest({ step: 3, stop: 12 }, [0, 3, 6, 9, 12])
  makeTest({ step: 5, stop: 10 }, [0, 5, 10])
})

import { calendar } from './calendar'

describe('calendar', () => {
  const c = calendar()
  test('1234th day', () => {
    // https://www.google.com/search?q=1234+days+after+1900-1-1
    expect(c[1234]).toEqual({
      year: 1903,
      month: 5,
      day: 20,
      weekday: 3,
    })
  })

  test('40,000th day', () => {
    // https://www.google.com/search?q=40000+days+after+1900-1-1
    expect(c[40000]).toEqual({
      year: 2009,
      month: 7,
      day: 8,
      weekday: 3,
    })
  })
})

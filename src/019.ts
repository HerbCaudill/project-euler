// Counting Sundays
// ================
// You are given the following information, but you may prefer to do some
// research for yourself.
//
//   * 1 Jan 1900 was a Monday.
//   * Thirty days has September,
//     April, June and November.
//     All the rest have thirty-one,
//     Saving February alone,
//     Which has twenty-eight, rain or shine.
//     And on leap years, twenty-nine.
//   * A leap year occurs on any year evenly divisible by 4, but not on a
//     century unless it is divisible by 400.
//
// How many Sundays fell on the first of the month during the twentieth
// century (1 Jan 1901 to 31 Dec 2000)?

const isLeapYear = (y: number) =>
  y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)

expect(isLeapYear(1900)).toBe(false)
expect(isLeapYear(1903)).toBe(false)
expect(isLeapYear(1904)).toBe(true)
expect(isLeapYear(1996)).toBe(true)
expect(isLeapYear(1997)).toBe(false)
expect(isLeapYear(2000)).toBe(true)

// m is 1-based (1=january, 2=february, etc)
const daysInMonth = (m: number, y: number): number =>
  (<{ [k: number]: number }>{
    1: 31,
    2: isLeapYear(y) ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  })[m]

expect(daysInMonth(3, 2019)).toEqual(31)
expect(daysInMonth(2, 2019)).toEqual(28)
expect(daysInMonth(2, 2020)).toEqual(29)

export const solution019 = () => -1

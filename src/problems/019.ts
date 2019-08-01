import { calendar } from '../lib/calendar'

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

const c = calendar()

const sundayTheFirsts = (start: number, end: number) => {
  return c.filter(
    d =>
      d.year >= start &&
      d.year <= end &&
      d.weekday === 0 && // sunday
      d.day === 1 // first of the month
  ).length
}

expect(sundayTheFirsts(1901, 1902)).toEqual(3)

export const solution019 = () => sundayTheFirsts(1901, 2000)

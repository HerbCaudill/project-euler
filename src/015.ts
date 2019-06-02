import { pascalTriangle } from './lib'

// Lattice paths
// =============
// Starting in the top left corner of a 2 * 2 grid, there are 6 routes
// (without backtracking) to the bottom right corner.
//
// How many routes are there through a 20 * 20 grid?

const routesThroughGrid = (size: number) => pascalTriangle(size * 2, size)

expect(routesThroughGrid(1)).toEqual(2)
expect(routesThroughGrid(2)).toEqual(6)
expect(routesThroughGrid(3)).toEqual(20)

export const solution015 = () => routesThroughGrid(20)

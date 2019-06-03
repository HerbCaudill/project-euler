// Maximum path sum I
// ==================
// By starting at the top of the triangle below and moving to adjacent
// numbers on the row below, the maximum total from top to bottom is 23.
//
//              3
//             7 4
//            2 4 6
//           8 5 9 3
//
// That is, 3 + 7 + 4 + 9 = 23.
//
// Find the maximum total from top to bottom of the triangle below:
//
// NOTE: As there are only 16384 routes, it is possible to solve this problem
// by trying every route. However, Problem 67, is the same challenge with
// a triangle containing one-hundred rows; it cannot be solved by brute
// force, and requires a clever method! ;o)

const SOURCE = `
                       75
                     95 64
                    17 47 82
                  18 35 87 10
                 20 04 82 47 65
               19 01 23 75 03 34
              88 02 77 73 07 63 67
            99 65 04 28 06 16 70 92
           41 41 26 56 83 40 80 70 33
         41 48 72 33 47 32 37 16 94 29
        53 71 44 65 25 43 91 52 97 51 14
      70 11 33 28 77 73 17 78 39 68 17 57
     91 71 52 38 17 14 91 43 58 50 27 29 48
   63 66 04 68 89 53 67 30 73 16 69 87 40 31
  04 62 98 27 23 09 70 98 73 93 38 53 60 04 23
`

// We'll structure this triangle as a tree, with the top number as the root node.
// Each node has two children - one to the left, and one to the right.
//
// If we look at a tiny triangle of three numbers, it's easy to see the
// optimal path: Take the bigger of the two child values, and add it
// to the parent value. For example, using the last triangle on the
// lower left of the first example, the maximum path is 2 -> 8 and the
// maximum path sum is 10.
//
//     2  -> maxSum = 10 (8 + 2)
//    8 5
//
// We can generalize: The maximum path sum starting from any node, is that node's
// value plus the highest maximum path sum of its two children. So we can attach
// a value `maxSum` to each node, starting with the nodes in the bottom row (for these
// terminal nodes, the `maxSum` value is just the node's value.)
//
//    `value`             `maxSum`
//
//       3                  23     ->  3 + 7 + 4 + 9
//      7 4               20  19
//     2 4 6            10  13  15
//    8 5 9 3          8  5   9   3
//
// The `maxSum` value for the root node will be the solution, and we can easily
// populate at the same time that we build the tree.

interface Node {
  value: number
  child_L?: Node // left child
  child_R?: Node // right child
  child_maxPath?: Node // child leading to optimal path
  maxSum?: number // sum of values in optimal path
}

// Convert the tree from its representation as a single string
// to an array of arrays of numbers.
const parseTree = (strTree: string): number[][] =>
  strTree
    .trim()
    .split(/\n/)
    .map(strRow =>
      strRow
        .trim()
        .split(/\s/)
        .map(value => +value)
    )

const _rows = parseTree(SOURCE)

expect(_rows[0]).toEqual([75])
expect(_rows[6]).toEqual([88, 2, 77, 73, 7, 63, 67])

const buildTree = (strTree: string): Node => {
  const rows = parseTree(strTree)
  const buildNode = (row: number, col: number): Node => {
    const node: Node = { value: rows[row][col] }
    if (row === rows.length - 1) {
      // last row - set node value as max
      node.maxSum = node.value
    } else {
      // not last row - identify the left and right children
      node.child_L = buildNode(row + 1, col)
      node.child_R = buildNode(row + 1, col + 1)
      // choose the one with the biggest sum
      node.child_maxPath =
        node.child_L.maxSum! > node.child_R.maxSum!
          ? node.child_L
          : node.child_R
      // that max plus our value is our node's max
      node.maxSum = node.child_maxPath.maxSum! + node.value
    }
    return node
  }
  return buildNode(0, 0)
}

export const solution018 = () => {
  const _node = buildTree(SOURCE)

  expect(_node.value).toEqual(75)
  expect(_node.child_L!.value).toEqual(95)
  expect(_node.child_R!.child_L!.value).toEqual(47)
  expect(_node.child_L!.child_R!.value).toEqual(47)
  expect(_node.child_L!.child_L!.child_R!.value).toEqual(35)

  return _node.maxSum
}

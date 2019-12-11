import memoize from 'fast-memoize'

export interface Node {
  value: number
  child_L?: Node // left child
  child_R?: Node // right child
  child_maxPath?: Node // child leading to optimal path
  maxSum?: number // sum of values in optimal path
}

// Convert the tree from its representation as a single string
// to an array of arrays of numbers.
export const parseTree = (strTree: string): number[][] =>
  strTree
    .trim()
    .split(/\n/)
    .map(strRow =>
      strRow
        .trim()
        .split(/\s/)
        .map(value => +value)
    )

export const buildTree = (strTree: string): Node => {
  const rows = parseTree(strTree)
  const buildNode = memoize(
    (row: number, col: number): Node => {
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
  )
  return buildNode(0, 0)
}

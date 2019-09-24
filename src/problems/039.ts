// Integer right triangles
// =======================
// If p is the perimeter of a right angle triangle with integral length
// sides, {a,b,c}, there are exactly three solutions for p = 120.
//
//                     {20,48,52}, {24,45,51}, {30,40,50}
//
// For which value of p < 1000, is the number of solutions maximised?

/*

We have two equations:
```
  a² + b² = c²
  a + b + c = p
```
So we can eliminate `c`:
```
  c = √(a² + b²) [1]
  a + b + sqrt(a² + b²) = p
```
So given `p` and `a`, we can calculate `b`:
```
  a + b - p = √(a² + b²)
  (a + b - p)² = a² + b²
  a² + 2ab - 2ap + b² - 2bp + p² = a² + b²
  2ab - 2ap - 2bp + p² = 0
  2ab - 2bp = 2ap - p²
  2b(a - p) = p(2a - p)
  b = p(2a - p) / 2(a - p) [2]
```

We also know that `1 <= a <= p - 2`, because each side has to be at least `1`. For the same reason `p` has
to be at least `1`. 

Our strategy will be to try every value of p from 3 to 999, and for every value of `p` try every value
of a between `1` and `p - 2`. That means we have to try one the order of half a million (rougly 998²/2)
combinations.
*/

export const solution039 = () => {
  let best = {
    p: 0,
    solutions: [] as { a: number; b: number; c: number }[],
  }
  for (let p = 3; p < 1000; p++) {
    const solutions = []
    for (let a = 1; a <= p - 2; a++) {
      const b = (p * (2 * a - p)) / (2 * (a - p)) // [2]
      if (b > 0 && Number.isInteger(b)) {
        const c = Math.sqrt(a ** 2 + b ** 2) // [1]
        if (Number.isInteger(c)) {
          solutions.push({ a, b, c })
        }
      }
    }
    if (solutions.length > best.solutions.length) best = { p, solutions }
  }
  return best.p
}

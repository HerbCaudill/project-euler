export const range = ({
  start = 0,
  stop,
  step = 1,
}: {
  start?: number
  stop: number
  step?: number
}) =>
  Array(Math.floor((stop - start) / step) + 1)
    .fill(start)
    .map((d, i) => d + i * step)

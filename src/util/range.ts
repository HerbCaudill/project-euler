export interface RangeProps {
  start?: number
  stop: number
  step?: number
}

export const range = ({ start = 0, stop, step = 1 }: RangeProps) =>
  Array(Math.floor((stop - start) / step) + 1)
    .fill(start)
    .map((d, i) => d + i * step)

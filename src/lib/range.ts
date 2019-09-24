export interface RangeProps {
  start?: number
  stop: number
  step?: number
}

export const range = (args: RangeProps | number): number[] => {
  const { start = 1, stop, step = 1 } =
    typeof args === 'object' ? args : { stop: args }
  return Array(Math.floor((stop - start) / step) + 1)
    .fill(start)
    .map((d, i) => d + i * step)
}

export function dropRepeats<T>(array: T[]): T[] {
  return array.filter((x, i, a) => a.indexOf(x) === i);
}

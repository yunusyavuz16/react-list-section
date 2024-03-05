const reverseList = <T>(list: T[]): T[] =>
  list.map((_: T, i: number, l: T[]) => l[l.length - (i + 1)])

export default reverseList

export const intersection = <T = unknown>(arr1: T[], arr2: T[]): T[] => {
  return arr1.filter((value) => arr2.includes(value))
}

export const haveIntersection = <T = unknown>(
  arr1: T[] | undefined,
  arr2: T[] | undefined,
): boolean => {
  if (arr1 == undefined || arr2 === undefined) {
    return false
  }
  return intersection(arr1, arr2).length > 0
}

export function last<T>(arr?: T[]): T | undefined {
  if (arr === undefined) return undefined;
  return arr[arr.length - 1];
}

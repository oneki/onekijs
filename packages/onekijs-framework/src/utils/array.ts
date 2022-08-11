export function last<T>(arr?: T[]): T | undefined {
  if (arr === undefined) return undefined;
  return arr[arr.length - 1];
}

export function first<T>(arr?: T[]): T | undefined {
  if (arr === undefined) return undefined;
  return arr[0];
}

export const isSameArray = (a1: any[] | undefined, a2: any[] | undefined): boolean => {
  if (a1 === undefined && a2 === undefined) return true;
  if (a1 === undefined || a2 === undefined) return false;
  if (a1.length !== a2.length) return false;
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
};

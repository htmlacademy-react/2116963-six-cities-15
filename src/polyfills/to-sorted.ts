if (!('toSorted' in Array.prototype)) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Array.prototype.toSorted = function <T>(compareFn?: (a: T, b: T) => number): T[] {
    return [...this].sort(compareFn);
  };
}

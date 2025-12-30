export function isEmpty<T extends any[]>(array: T): boolean {
  return array.length === 0;
}

export function noop() {}

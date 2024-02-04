// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const valueSelector = <T extends string | number | symbol, K = any>(
  values: Record<T, K>,
  key: T | null | undefined
) => {
  if (key === null || key === undefined) return null;
  return values[key];
};

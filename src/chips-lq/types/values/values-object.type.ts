import { Value } from "./value.type";

export type ValuesObject<T extends Object> = Record<
  string,
  Value<T>
>;

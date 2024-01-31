import { Value } from "./value.type";

export type ValuesNonNullable<unknown><T extends NonNullable<unknown>> = {
  field: string;
  value: Value<T>;
}[];

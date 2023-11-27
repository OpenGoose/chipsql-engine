import { Value } from "./value.type";

export type ValuesObject<T extends Object> = {
  field: string;
  value: Value<T>;
}[];

import { Value } from "../values/value.type";

export type GroupBy<T extends NonNullable<unknown>> = number | Value<T>;

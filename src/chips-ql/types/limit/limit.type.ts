import { Value } from "../values/value.type";
import { LimitMode } from "./limit-mode.enum";

export interface Limit<T extends NonNullable<unknown>> {
    value: Value<T>;
    limitMode?: LimitMode;
}
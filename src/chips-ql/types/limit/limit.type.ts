import { Value } from "../values/value.type";
import { LimitMode } from "./limit-mode.enum";

export interface Limit<T extends Object> {
    value: Value<T>;
    limitMode?: LimitMode;
}
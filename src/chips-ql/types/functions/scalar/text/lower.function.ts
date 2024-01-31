import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LowerFunction<T extends NonNullable<unknown>> {
    function: Functions.LOWER,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface SqrtFunction<T extends NonNullable<unknown>> {
    function: Functions.SQRT,
    value: Value<T>;
}
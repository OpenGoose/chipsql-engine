import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface SqrtFunction<T extends Object> {
    function: Functions.SQRT,
    value: Value<T>;
}
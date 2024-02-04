import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface LowerFunction<T extends Object> {
    function: Function.LOWER,
    value: Value<T>;
}
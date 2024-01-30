import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface AbsFunction<T extends Object> {
    function: Function.ABS,
    value: Value<T>;
}
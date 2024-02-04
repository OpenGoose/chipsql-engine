import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface FormatFunction<T extends Object> {
    function: Function.FORMAT,
    value: Value<T>;
    format: Value<T>;
    culture?: Value<T>;
}
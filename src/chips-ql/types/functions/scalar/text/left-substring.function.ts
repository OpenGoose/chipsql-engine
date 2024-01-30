import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface LeftSubstringFunction<T extends Object> {
    function: Function.LEFT_SUBSTRING;
    value: Value<T>;
    length: Value<T>;
}
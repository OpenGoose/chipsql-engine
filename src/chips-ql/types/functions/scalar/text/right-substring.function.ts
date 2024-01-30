import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface RightSubstringFunction<T extends Object> {
    function: Function.RIGHT_SUBSTRING;
    value: Value<T>;
    length: Value<T>;
}
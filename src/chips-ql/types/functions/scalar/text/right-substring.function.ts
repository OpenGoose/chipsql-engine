import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface RightSubstringFunction<T extends Object> {
    function: Functions.RIGHT_SUBSTRING;
    value: Value<T>;
    length: Value<T>;
}
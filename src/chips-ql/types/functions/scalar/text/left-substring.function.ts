import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LeftSubstringFunction<T extends Object> {
    function: Functions.LEFT_SUBSTRING;
    value: Value<T>;
    length: Value<T>;
}
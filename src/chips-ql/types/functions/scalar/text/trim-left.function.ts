import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface TrimLeftFunction<T extends Object> {
    function: Function.TRIM_LEFT;
    value: Value<T>;
}
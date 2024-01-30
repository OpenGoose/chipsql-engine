import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface TrimRightFunction<T extends Object> {
    function: Function.TRIM_RIGHT;
    value: Value<T>;
}
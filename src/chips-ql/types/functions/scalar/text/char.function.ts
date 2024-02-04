import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface CharFunction<T extends Object> {
    function: Function.CHAR;
    value: Value<Object>;
}
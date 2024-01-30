import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface UpperFunction<T extends Object> {
    function: Function.UPPER;
    value: Value<T>;
}
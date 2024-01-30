import { Value } from "../../values/value.type";
import { Function } from "../functions.enum";

export interface MinFunction<T extends Object> {
    function: Function.MIN;
    value: Value<T>;
}
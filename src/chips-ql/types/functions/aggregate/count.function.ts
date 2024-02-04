import { Value } from "../../values/value.type";
import { Function } from "../functions.enum";

export interface CountFunction<T extends Object> {
    function: Function.COUNT;
    value: Value<T>;
}
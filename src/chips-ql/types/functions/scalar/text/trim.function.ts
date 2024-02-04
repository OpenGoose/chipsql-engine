import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface TrimFunction<T extends Object> {
    function: Function.TRIM;
    value: Value<T>;
}
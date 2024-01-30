import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface RoundFunction<T extends Object> {
    function: Function.ROUND,
    value: Value<T>;
}
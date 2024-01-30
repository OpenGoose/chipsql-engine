import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface ExpFunction<T extends Object> {
    function: Function.EXP,
    value: Value<T>;
}
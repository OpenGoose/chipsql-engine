import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface MonthFunction<T extends Object> {
    function: Function.MONTH,
    value: Value<T>;
}
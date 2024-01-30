import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface YearFunction<T extends Object> {
    function: Function.YEAR,
    value: Value<T>;
}
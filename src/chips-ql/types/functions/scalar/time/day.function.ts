import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface DayFunction<T extends Object> {
    function: Function.DAY,
    value: Value<T>;
}
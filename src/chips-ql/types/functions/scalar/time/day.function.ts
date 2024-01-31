import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface DayFunction<T extends Object> {
    function: Functions.DAY,
    value: Value<T>;
}
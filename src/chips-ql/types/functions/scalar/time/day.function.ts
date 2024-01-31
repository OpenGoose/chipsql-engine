import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface DayFunction<T extends NonNullable<unknown>> {
    function: Functions.DAY,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface MonthFunction<T extends Object> {
    function: Functions.MONTH,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface YearFunction<T extends Object> {
    function: Functions.YEAR,
    value: Value<T>;
}
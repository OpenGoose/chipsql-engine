import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface YearFunction<T extends NonNullable<unknown>> {
    function: Functions.YEAR,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface FormatFunction<T extends NonNullable<unknown>> {
    function: Functions.FORMAT,
    value: Value<T>;
    format: Value<T>;
    culture?: Value<T>;
}
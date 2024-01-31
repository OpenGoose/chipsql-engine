import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface AbsFunction<T extends NonNullable<unknown>> {
    function: Functions.ABS,
    value: Value<T>;
}
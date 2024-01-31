import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface TrimFunction<T extends NonNullable<unknown>> {
    function: Functions.TRIM;
    value: Value<T>;
}
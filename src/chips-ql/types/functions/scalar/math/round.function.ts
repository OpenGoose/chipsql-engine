import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface RoundFunction<T extends NonNullable<unknown>> {
    function: Functions.ROUND,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CharFunction<T extends NonNullable<unknown>> {
    function: Functions.CHAR;
    value: Value<NonNullable<unknown>>;
}
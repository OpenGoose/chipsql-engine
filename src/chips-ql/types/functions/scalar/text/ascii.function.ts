import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface AsciiFunction<T extends NonNullable<unknown>> {
    function: Functions.ASCII,
    value: Value<NonNullable<unknown>>,
}
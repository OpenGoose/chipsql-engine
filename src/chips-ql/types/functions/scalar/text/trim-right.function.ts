import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface TrimRightFunction<T extends NonNullable<unknown>> {
    function: Functions.TRIM_RIGHT;
    value: Value<T>;
}
import { Value } from "../../values/value.type";
import { Functions } from "../functions.enum";

export interface MinFunction<T extends NonNullable<unknown>> {
    function: Functions.MIN;
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface TanFunction<T extends NonNullable<unknown>> {
    function: Functions.TAN,
    value: Value<T>;
}
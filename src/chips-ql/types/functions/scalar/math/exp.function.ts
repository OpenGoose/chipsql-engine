import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface ExpFunction<T extends NonNullable<unknown>> {
    function: Functions.EXP,
    value: Value<T>;
}
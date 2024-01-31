import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface PowerFunction<T extends NonNullable<unknown>> {
    function: Functions.POWER,
    value: Value<T>;
}
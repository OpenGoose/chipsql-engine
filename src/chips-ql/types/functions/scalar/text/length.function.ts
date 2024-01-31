import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LengthFunction<T extends NonNullable<unknown>> {
    function: Functions.LENGTH,
    value: Value<T>;
}
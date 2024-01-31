import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CosFunction<T extends NonNullable<unknown>> {
    function: Functions.COS,
    value: Value<T>;
}
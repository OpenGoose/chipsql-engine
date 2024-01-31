import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CeilFunction<T extends NonNullable<unknown>> {
    function: Functions.CEIL,
    value: Value<T>;
}
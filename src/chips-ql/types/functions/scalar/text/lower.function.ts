import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LowerFunction<T extends Object> {
    function: Functions.LOWER,
    value: Value<T>;
}
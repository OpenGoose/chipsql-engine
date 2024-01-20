import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface TrimLeftFunction<T extends Object> {
    function: Functions.TRIM_LEFT;
    value: Value<T>;
}
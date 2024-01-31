import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface RoundFunction<T extends Object> {
    function: Functions.ROUND,
    value: Value<T>;
}
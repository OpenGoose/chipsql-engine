import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface SinFunction<T extends Object> {
    function: Functions.SIN,
    value: Value<T>;
}
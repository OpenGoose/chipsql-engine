import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface UpperFunction<T extends Object> {
    function: Functions.UPPER;
    value: Value<T>;
}
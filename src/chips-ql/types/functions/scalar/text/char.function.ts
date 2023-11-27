import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CharFunction<T extends Object> {
    function: Functions.CHAR;
    value: Value<Object>;
}
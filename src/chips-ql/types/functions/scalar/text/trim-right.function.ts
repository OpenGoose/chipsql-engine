import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface TrimRightFunction<T extends Object> {
    function: Functions.TRIM_RIGHT;
    value: Value<T>;
}
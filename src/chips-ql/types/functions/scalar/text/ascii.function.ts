import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface AsciiFunction<T extends Object> {
    function: Functions.ASCII,
    value: Value<Object>,
}
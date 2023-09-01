import { Value } from "../../values/value.type";
import { Functions } from "../functions.enum";

export interface CountFunction<T extends Object> {
    function: Functions.COUNT;
    value: Value<T>;
}
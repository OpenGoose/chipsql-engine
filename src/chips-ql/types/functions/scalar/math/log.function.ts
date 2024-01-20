import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LogFunction<T extends Object> {
    function: Functions.LOG,
    value: Value<T>;
}
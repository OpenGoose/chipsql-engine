import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LogFunction<T extends NonNullable<unknown>> {
    function: Functions.LOG,
    value: Value<T>;
}
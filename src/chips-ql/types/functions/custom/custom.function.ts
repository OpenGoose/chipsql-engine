import { Value } from "../../values/value.type";
import { Functions } from "../functions.enum";

export interface CustomFunction<T extends NonNullable<unknown>> {
    function: Functions.CUSTOM,
    name: string;
    parameters: Value<T>[];
}
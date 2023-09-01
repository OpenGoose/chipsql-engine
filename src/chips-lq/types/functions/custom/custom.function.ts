import { Value } from "../../values/value.type";
import { Functions } from "../functions.enum";

export interface CustomFunction<T extends Object> {
    function: Functions.CUSTOM,
    name: string;
    parameters: Value<T>[];
}
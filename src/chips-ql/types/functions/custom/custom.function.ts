import { Value } from "../../values/value.type";
import { Function } from "../functions.enum";

export interface CustomFunction<T extends Object> {
    function: Function.CUSTOM,
    name: string;
    parameters: Value<T>[];
}
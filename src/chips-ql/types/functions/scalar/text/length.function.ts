import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface LengthFunction<T extends Object> {
    function: Functions.LENGTH,
    value: Value<T>;
}
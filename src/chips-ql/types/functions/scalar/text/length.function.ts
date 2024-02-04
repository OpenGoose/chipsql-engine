import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface LengthFunction<T extends Object> {
    function: Function.LENGTH,
    value: Value<T>;
}
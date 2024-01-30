import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface CosFunction<T extends Object> {
    function: Function.COS,
    value: Value<T>;
}
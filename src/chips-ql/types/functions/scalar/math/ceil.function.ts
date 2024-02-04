import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface CeilFunction<T extends Object> {
    function: Function.CEIL,
    value: Value<T>;
}
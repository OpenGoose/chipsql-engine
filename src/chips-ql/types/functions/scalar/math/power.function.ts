import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface PowerFunction<T extends Object> {
    function: Function.POWER,
    value: Value<T>;
}
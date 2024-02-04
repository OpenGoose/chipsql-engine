import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface DifferenceFunction<T extends Object> {
    function: Function.DIFFERENCE;
    origin: Value<T>;
    target: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface JoinFunction<T extends Object> {
    function: Function.JOIN;
    separator?: Value<Object>;
    values: Value<Object>[];
}
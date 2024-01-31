import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface JoinFunction<T extends Object> {
    function: Functions.JOIN;
    separator?: Value<Object>;
    values: Value<Object>[];
}
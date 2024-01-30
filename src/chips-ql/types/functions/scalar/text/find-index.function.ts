import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface FindIndexFunction<T extends Object> {
    function: Function.FIND_INDEX;
    find: Value<Object>;
    on: Value<Object>;
    startAt?: Value<Object>;
}
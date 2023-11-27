import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface FindIndexFunction<T extends Object> {
    function: Functions.FIND_INDEX;
    find: Value<Object>;
    on: Value<Object>;
    startAt?: Value<Object>;
}
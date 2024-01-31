import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface FindIndexFunction<T extends NonNullable<unknown>> {
    function: Functions.FIND_INDEX;
    find: Value<NonNullable<unknown>>;
    on: Value<NonNullable<unknown>>;
    startAt?: Value<NonNullable<unknown>>;
}
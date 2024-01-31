import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface JoinFunction<T extends NonNullable<unknown>> {
    function: Functions.JOIN;
    separator?: Value<NonNullable<unknown>>;
    values: Value<NonNullable<unknown>>[];
}
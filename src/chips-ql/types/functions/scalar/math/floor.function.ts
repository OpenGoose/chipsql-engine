import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface FloorFunction<T extends NonNullable<unknown>> {
    function: Functions.FLOOR,
    value: Value<T>;
}
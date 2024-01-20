import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface FloorFunction<T extends Object> {
    function: Functions.FLOOR,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface PowerFunction<T extends Object> {
    function: Functions.POWER,
    value: Value<T>;
}
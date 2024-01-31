import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface DifferenceFunction<T extends Object> {
    function: Functions.DIFFERENCE;
    origin: Value<T>;
    target: Value<T>;
}
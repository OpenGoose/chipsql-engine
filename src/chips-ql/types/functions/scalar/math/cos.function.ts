import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CosFunction<T extends Object> {
    function: Functions.COS,
    value: Value<T>;
}
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface BytesLengthFunction<T extends Object> {
    function: Functions.BYTES_LENGTH,
    value: Value<Object>;
}
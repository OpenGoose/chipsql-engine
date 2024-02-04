import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface BytesLengthFunction<T extends Object> {
    function: Function.BYTES_LENGTH,
    value: Value<Object>;
}
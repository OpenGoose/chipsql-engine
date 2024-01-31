import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface BytesLengthFunction<T extends NonNullable<unknown>> {
    function: Functions.BYTES_LENGTH,
    value: Value<NonNullable<unknown>>;
}
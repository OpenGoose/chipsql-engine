import { DataType } from "../../../datatypes/datatype.type";
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CastFunction<T extends NonNullable<unknown>> {
    function: Functions.CAST;
    value: Value<T>;
    as: DataType;
}
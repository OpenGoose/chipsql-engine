import { DataType } from "../../../datatypes/datatype.type";
import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface CastFunction<T extends Object> {
    function: Function.CAST;
    value: Value<T>;
    as: DataType;
}
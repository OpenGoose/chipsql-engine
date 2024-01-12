import { DataType } from "../../../datatypes/datatype.type";
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface ConvertFunction<T extends Object> {
  function: Functions.CONVERT;
  value: Value<T>;
  as: DataType;
  style?: Value<T>;
}

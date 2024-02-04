import { DataType } from "../../../datatypes/datatype.type";
import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface ConvertFunction<T extends Object> {
  function: Function.CONVERT;
  value: Value<T>;
  as: DataType;
  style?: Value<T>;
}

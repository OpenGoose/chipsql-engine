import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface CoalesceFunction<T extends Object> {
  function: Function.COALESCE;
  values: Value<T>[];
}

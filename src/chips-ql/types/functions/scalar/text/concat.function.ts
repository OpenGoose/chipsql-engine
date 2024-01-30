import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface ConcatFunction<T extends Object> {
  function: Function.CONCAT;
  values: Value<T>[];
}

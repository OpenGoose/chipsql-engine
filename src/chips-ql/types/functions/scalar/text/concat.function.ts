import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface ConcatFunction<T extends Object> {
  function: Functions.CONCAT;
  values: Value<T>[];
}

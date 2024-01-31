import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface ConcatFunction<T extends NonNullable<unknown>> {
  function: Functions.CONCAT;
  values: Value<T>[];
}

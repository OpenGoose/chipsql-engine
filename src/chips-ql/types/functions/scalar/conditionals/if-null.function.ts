import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface IfNullFunction<T extends Object> {
  function: Functions.IF_NULL;
  value: Value<T>;
  whenNull: Value<T>;
}

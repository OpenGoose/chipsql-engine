import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface IfNullFunction<T extends Object> {
  function: Function.IF_NULL;
  value: Value<T>;
  whenNull: Value<T>;
}

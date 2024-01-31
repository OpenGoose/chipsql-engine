import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface IfNullFunction<T extends NonNullable<unknown>> {
  function: Functions.IF_NULL;
  value: Value<T>;
  whenNull: Value<T>;
}

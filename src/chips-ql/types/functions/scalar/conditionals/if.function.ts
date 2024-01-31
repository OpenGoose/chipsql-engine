import { Condition } from "../../../conditions/condition.type";
import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface IfFunction<T extends NonNullable<unknown>> {
  function: Functions.IF;
  condition: Condition<T>;
  whenTrue?: Value<T>;
  whenFalse?: Value<T>;
}

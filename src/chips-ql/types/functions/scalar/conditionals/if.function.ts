import { Condition } from "../../../conditions/condition.type";
import { Value } from "../../../values/value.type";
import { Function } from "../../functions.enum";

export interface IfFunction<T extends Object> {
  function: Function.IF;
  condition: Condition<T>;
  whenTrue?: Value<T>;
  whenFalse?: Value<T>;
}

import { Value } from "../../values/value.type";
import { Function } from "../functions.enum";

export interface MaxFunction<T extends Object> {
  function: Function.MAX;
  value: Value<T>;
}
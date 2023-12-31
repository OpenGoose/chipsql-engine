import { Value } from "../../values/value.type";
import { Functions } from "../functions.enum";

export interface MaxFunction<T extends Object> {
  function: Functions.MAX;
  value: Value<T>;
}
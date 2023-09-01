import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CoalesceFunction<T extends Object> {
  function: Functions.COALESCE;
  value: Value<T>;
  whenNull: Value<T>;
}

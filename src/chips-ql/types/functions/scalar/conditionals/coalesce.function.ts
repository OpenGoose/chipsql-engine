import { Value } from "../../../values/value.type";
import { Functions } from "../../functions.enum";

export interface CoalesceFunction<T extends NonNullable<unknown>> {
  function: Functions.COALESCE;
  values: Value<T>[];
}

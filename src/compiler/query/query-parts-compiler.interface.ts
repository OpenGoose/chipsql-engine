import { Table } from "../../chips-lq/types/tables/table.type";
import { AllowedValues } from "../../chips-lq/types/values/allowed-values.type";
import { Value } from "../../chips-lq/types/values/value.type";

export interface IQueryPartsCompiler<T extends Object> {
  // Globals
  fields: (values: Value<T>[]) => string;
  from: (tables: Table<T>[]) => string;

  // Specific
  value: (value: Value<T>) => string;
  table: (table: Table<T>) => string;

  // Utils
  escape: (value: AllowedValues) => string;
}
import { Where } from "../../chips-lq/types/conditions/where.type";
import { Join } from "../../chips-lq/types/joins/join.type";
import { Table } from "../../chips-lq/types/tables/table.type";
import { AllowedValues } from "../../chips-lq/types/values/allowed-values.type";
import { Value } from "../../chips-lq/types/values/value.type";

export interface IQueryPartsCompiler<T extends Object> {
  // Globals
  fields: (values: Value<T>[]) => string;
  from: (tables: Table<T>[]) => string;
  where: (whereValue: Where<T>) => string;
  joins: (joinValues: Join<T>[]) => string;

  // Specific
  value: (value: Value<T>) => string;
  table: (table: Table<T>) => string;
  join: (joinValue: Join<T>) => string;
  limit: (limitValue: Value<T>) => string;
  offset: (offsetValue: Value<T>) => string;

  // Utils
  escape: (value: AllowedValues) => string;
}

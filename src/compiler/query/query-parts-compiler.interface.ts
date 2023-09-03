import { Where } from "../../chips-lq/types/conditions/where.type";
import { GroupBy } from "../../chips-lq/types/grouping/group-by.type";
import { Join } from "../../chips-lq/types/joins/join.type";
import { OrderBy } from "../../chips-lq/types/order/order-by.type";
import { Select } from "../../chips-lq/types/queries/select.type";
import { Table } from "../../chips-lq/types/tables/table.type";
import { AllowedValues } from "../../chips-lq/types/values/allowed-values.type";
import { Value } from "../../chips-lq/types/values/value.type";

export interface IQueryPartsCompiler<T extends Object> {
  // Globals
  fields: (values: Value<T>[]) => string;
  from: (tables: Table<T>[]) => string;
  where: (whereValue: Where<T>) => string;
  joins: (joinValues: Join<T>[]) => string;
  grouping: (groupingValues: GroupBy<T>[]) => string;
  orders: (orderByValue: OrderBy<T>[]) => string;

  // Specific
  value: (value: Value<T>) => string;
  table: (table: Table<T>) => string;
  join: (joinValue: Join<T>) => string;
  groupBy: (groupByValue: GroupBy<T>) => string;
  having: (havingValue: Where<T>) => string;
  orderBy: (orderByValue: OrderBy<T>) => string;
  limit: (limitValue: Value<T>) => string;
  offset: (offsetValue: Value<T>) => string;
  subselect: (select: Omit<Select<Object>, "queryType">) => string;

  // Utils
  escape: (value: AllowedValues) => string;
}

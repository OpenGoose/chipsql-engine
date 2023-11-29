import { Where } from "../../chips-ql/types/conditions/where.type";
import { DataType } from "../../chips-ql/types/datatypes/datatype.type";
import { GroupBy } from "../../chips-ql/types/grouping/group-by.type";
import { Join } from "../../chips-ql/types/joins/join.type";
import { LimitOptions } from "../../chips-ql/types/limit/limit-options.type";
import { Limit } from "../../chips-ql/types/limit/limit.type";
import { OrderBy } from "../../chips-ql/types/order/order-by.type";
import { Select } from "../../chips-ql/types/queries/select.type";
import { Table } from "../../chips-ql/types/tables/table.type";
import { AllowedValues } from "../../chips-ql/types/values/allowed-values.type";
import { FunctionValue, Value } from "../../chips-ql/types/values/value.type";
import { QueryCompilerOptions } from "./query-compiler-options.type";

export interface IQueryPartsCompiler<T extends Object> {
  readonly avoidableSpace: string;
  readonly options?: QueryCompilerOptions;

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
  limit: (limitValue: Limit<T>, options?: LimitOptions) => string;
  offset: (offsetValue: Value<T>) => string;
  into: (table: Table<Object>) => string;
  subselect: (select: Omit<Select<Object>, "queryType">) => string;
  func: (funcValue: FunctionValue<T>) => string;
  dataType: (dataTypeValue: DataType) => string;

  // Utils
  escape: (value: AllowedValues) => string;
  generateField: (field: string) => string;
}

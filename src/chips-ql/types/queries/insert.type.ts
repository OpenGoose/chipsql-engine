import { Table } from "../tables/table.type";
import { ValuesNonNullable<unknown> } from "../values/values-object.type";
import { InsertOptions } from "./options/insert-options.type";
import { QueryTypes } from "./query.type";

export interface Insert<T extends NonNullable<unknown>> {
  queryType: QueryTypes.INSERT;
  into: Table<T>;
  values: ValuesNonNullable<unknown><T>[];

  options?: InsertOptions;
}
